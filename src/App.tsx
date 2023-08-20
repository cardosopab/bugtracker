import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, database } from './models/database/firebase-config';
import ProtectedRoutes from './views/ProtectedRoutes';
import Dashboard from './views/dashboard/Dashboard';
import { DASHBOARD, DETAILS, PROFILE, PROJECTS, ROLES, TICKETS, USERS } from './views/viewsUrls';
import TicketsController from './controllers/TicketsController';
import Profile from './views/profile/Profile';
import ProjectsController from './controllers/ProjectsController';
import UsersController from './controllers/UsersController';
import RolesController from './controllers/RolesController';
import AuthController from './controllers/AuthController';
import DetailsController from './controllers/DetailsController';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Project from './models/Project';
import { batch, useDispatch } from 'react-redux';
import { setProjects } from './models/redux/projectsSlice';
import User from './models/User';
import { setUsers } from './models/redux/usersSlice';

function App() {
    const [authInitialized, setAuthInitialized] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((_) => {
            setAuthInitialized(true);
        });

        const unsubscribeProjects =
            onSnapshot(
                query(collection(database, PROJECTS), orderBy("createdAt", "desc")),
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
                query(collection(database, USERS), orderBy("createdAt", "desc")),
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

        return () => {
            console.log('unsubscribe')
            unsubscribeAuth();
            unsubscribeProjects();
            unsubscribeUsers();
        }
    }, []);

    if (!authInitialized) {
        return <div className='card'>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/' element={<AuthController />} />
                        <Route path={DASHBOARD} element={<Dashboard />} />
                        <Route path={ROLES} element={<RolesController />} />
                        <Route path={USERS} element={<UsersController />} />
                        <Route path={PROJECTS} element={<ProjectsController />} />
                        <Route path={TICKETS} element={<TicketsController />} />
                        <Route path={PROFILE} element={<Profile />} />
                        <Route path={DETAILS} element={<DetailsController />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

