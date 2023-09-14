import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, database } from './models/database/firebase-init';
import ProtectedRoutes from './views/ProtectedRoutes';
import Dashboard from './views/dashboard/Dashboard';
import { DASHBOARD_URL, PROJECT_DETAILS_URL, PROFILE_URL, PROJECTS_URL, ROLES_URL, TICKETS_URL, USERS_URL, KANBAN_URL } from './views/viewsUrls';
import TicketsController from './controllers/TicketsController';
import Profile from './views/profile/Profile';
import ProjectsController from './controllers/ProjectsController';
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import Project from './models/Project';
import { batch, useDispatch, useSelector } from 'react-redux';
import { setProjects } from './models/redux/projectsSlice';
import User from './models/User';
import { setUsers } from './models/redux/usersSlice';
import Ticket from './models/Ticket';
import { setTickets } from './models/redux/ticketsSlice';
import { PROJECTS_COLLECTION, TICKETS_COLLECTION, USERS_COLLECTION } from './models/database/collections';
import { onAuthStateChanged } from 'firebase/auth';
import AuthController from './controllers/AuthController';
import RolesController from './controllers/RolesController';
import UsersController from './controllers/UsersController';
import ProjectDetailsController from './controllers/ProjectDetailsController';
import { setAuthStatus, setCurrentUserId } from './models/redux/authSlice';
import { RootState } from './models/redux/store';
import KanbanController from './controllers/KanbanController';

function App() {
    const [authInitialized, setAuthInitialized] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined)
    const authStatus = useSelector((state: RootState) => state.auth.authStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            setAuthInitialized(true);
            console.log('onAuthStateChanged', user);
            console.log('auth: ', auth)
            const isAuth = user?.uid != undefined;
            console.log('isAuth', isAuth)
            dispatch(setAuthStatus(isAuth));
            dispatch(setCurrentUserId(user?.uid ?? ''));

            // Initialize currentUser
            if (user) {
                // Assuming you have a reference to the users collection
                const userDocRef = doc(database, USERS_COLLECTION, user.uid);

                try {
                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        const data = userDocSnapshot.data();

                        // Set the currentUserId variable with the user data
                        dispatch(setCurrentUserId(user?.uid ?? ''));
                        const userObj: User = {
                            id: data.id,
                            name: data.name,
                            createdAt: data.createdAt,
                            email: data.email,
                            role: data.role,
                            companyId: data.companyId,
                        };
                        setCurrentUser(userObj); // Add a setCurrentUser action to set the user data in the state
                    } else {
                        console.log('User document not found in Firestore.');
                    }
                } catch (error) {
                    console.error('Error fetching user document:', error);
                }
            } else {
                // User is not authenticated, handle it as needed
            }
        });

        return () => {
            console.log('unsubscribeAuth');
            unsubscribeAuth();
        };
    }, []);

    useEffect(() => {
        if (authInitialized && authStatus && currentUser != undefined) {
            // Determine if the currentUser is an admin
            const isAdmin = currentUser.role === 'Admin';

            // Create references to collections
            const usersCollection = collection(database, USERS_COLLECTION);
            const projectsCollection = collection(database, PROJECTS_COLLECTION);
            const ticketsCollection = collection(database, TICKETS_COLLECTION);

            // Create queries for users, projects, and tickets
            const usersQuery = isAdmin
                ? query(usersCollection, orderBy("createdAt", "desc"))
                : query(
                    usersCollection,
                    where('companyId', '==', currentUser.companyId),
                    orderBy('createdAt', 'desc')
                );

            const projectsQuery = isAdmin
                ? query(projectsCollection, orderBy('createdAt', 'desc'))
                : query(
                    projectsCollection,
                    where('companyId', '==', currentUser.companyId),
                    orderBy('createdAt', 'desc')
                );

            const ticketsQuery = isAdmin
                ? query(ticketsCollection, orderBy('createdAt', 'desc'))
                : query(
                    ticketsCollection,
                    where('companyId', '==', currentUser.companyId),
                    orderBy('createdAt', 'desc')
                );

            // Subscribe to changes in users
            const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
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
                        companyId: data.companyId,
                    };
                    arr.push(user)
                });
                batch(() => {
                    console.log('subscribedUsers')
                    dispatch(setUsers(arr));
                });
            });

            // Subscribe to changes in projects
            const unsubscribeProjects = onSnapshot(projectsQuery, (querySnapshot) => {
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
                    arr.push(project);
                });
                batch(() => {
                    console.log('subscribedProjects')
                    dispatch(setProjects(arr));
                });
            });

            // Subscribe to changes in tickets
            const unsubscribeTickets = onSnapshot(ticketsQuery, (querySnapshot) => {
                const arr: Ticket[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log('data', data)
                    const ticket: Ticket = {
                        id: data.id,
                        projectId: data.projectId,
                        companyId: data.companyId,
                        title: data.title,
                        description: data.description,
                        submitterId: data.submitterId,
                        personnelId: data.personnelId,
                        priority: data.priority,
                        status: data.status,
                        type: data.type,
                        createdAt: data.createdAt,
                        comments: data.comments,
                    };
                    arr.push(ticket);
                });
                batch(() => {
                    console.log('subscribedTickets')
                    dispatch(setTickets(arr));
                });
            });

            // Return cleanup function to unsubscribe from all collections
            return () => {
                console.log('unsubscribe Users, Projects, and Tickets');
                unsubscribeUsers();
                unsubscribeProjects();
                unsubscribeTickets();
            };
        }
    }, [authInitialized, authStatus, currentUser]);

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
                        <Route path={KANBAN_URL} element={<KanbanController />} />
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

