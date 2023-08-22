import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, database } from './models/database/firebase-config';
import ProtectedRoutes from './views/ProtectedRoutes';
import Dashboard from './views/dashboard/Dashboard';
import { DASHBOARD_URL, PROJECT_DETAILS_URL, PROFILE_URL, PROJECTS_URL, ROLES_URL, TICKETS_URL, USERS_URL } from './views/viewsUrls';
import TicketsController from './controllers/TicketsController';
import Profile from './views/profile/Profile';
import ProjectsController from './controllers/ProjectsController';
import UsersController from './controllers/UsersController';
import RolesController from './controllers/RolesController';
import AuthController from './controllers/AuthController';
import ProjectDetailsController from './controllers/ProjectDetailsController';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Project from './models/Project';
import { batch, useDispatch } from 'react-redux';
import { setProjects } from './models/redux/projectsSlice';
import User from './models/User';
import { setUsers } from './models/redux/usersSlice';
import Ticket from './models/Ticket';
import { setTickets } from './models/redux/ticketsSlice';
import { PROJECTS_COLLECTION, TICKETS_COLLECTION, USERS_COLLECTION } from './models/database/collections';

function App() {
    const [authInitialized, setAuthInitialized] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((_) => {
            setAuthInitialized(true);
        });

        const unsubscribeProjects =
            onSnapshot(
                query(collection(database, PROJECTS_COLLECTION), orderBy("createdAt", "desc")),
                (querySnapshot) => {
                    const arr: Project[] = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        console.log('data', data)
                        const project: Project = {
                            id: data.id,
                            name: data.name,
                            description: data.description,
                            createdAt: data.createdAt,
                            personnel: data.personnel,
                        };
                        arr.push(project)
                    });
                    batch(() => {
                        console.log('subscribedProjects')
                        dispatch(setProjects(arr));
                    });
                });
        const unsubscribeUsers =
            onSnapshot(
                query(collection(database, USERS_COLLECTION), orderBy("createdAt", "desc")),
                (querySnapshot) => {
                    const arr: User[] = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        console.log('data', data)
                        const user: User = {
                            id: data.id,
                            name: data.name,
                            createdAt: data.createdAt,
                            email: data.email,
                            role: data.role,
                        };
                        arr.push(user)
                    });
                    batch(() => {
                        console.log('subscribedUsers')
                        dispatch(setUsers(arr));
                    });
                });
        const unsubscribeTickets =
            onSnapshot(
                query(collection(database, TICKETS_COLLECTION), orderBy("createdAt", "desc")),
                (querySnapshot) => {
                    const arr: Ticket[] = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        console.log('data', data)
                        const ticket: Ticket = {
                            id: data.id,
                            name: data.name,
                            createdAt: data.createdAt,
                            projectId: data.projectId,
                            title: data.title,
                            dev: data.dev,
                            priority: data.priority,
                            status: data.status,
                            type: data.type,
                            comments: data.comments,
                        };
                        arr.push(ticket)
                    });
                    batch(() => {
                        console.log('subscribedTickets')
                        dispatch(setTickets(arr));
                    });
                });

        return () => {
            console.log('unsubscribe')
            unsubscribeAuth();
            unsubscribeProjects();
            unsubscribeUsers();
            unsubscribeTickets();
        }
    }, []);

    if (!authInitialized) {
        return <div className='center'>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/' element={<AuthController />} />
                        <Route path={DASHBOARD_URL} element={<Dashboard />} />
                        <Route path={ROLES_URL} element={<RolesController />} />
                        <Route path={USERS_URL} element={<UsersController />} />
                        <Route path={PROJECTS_URL} element={<ProjectsController />} />
                        <Route path={TICKETS_URL} element={<TicketsController />} />
                        <Route path={PROFILE_URL} element={<Profile />} />
                        <Route path={PROJECT_DETAILS_URL} element={<ProjectDetailsController />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

