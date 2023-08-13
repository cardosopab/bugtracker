import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './models/database/firebase-config';
import ProtectedRoutes from './views/ProtectedRoutes';
import AuthView from './views/auth/AuthView';
import Dashboard from './views/dashboard/Dashboard';
import { DASHBOARD, PROFILE, PROJECTS, ROLES, TICKETS, USERS } from './views/viewsUrls';
import Tickets from './views/tickets/Tickets';
import Profile from './views/profile/Profile';
import ProjectsController from './controllers/ProjectsController';
import UsersController from './controllers/UsersController';
import RolesController from './controllers/RolesController';

function App() {
    const [authInitialized, setAuthInitialized] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((_) => {
            setAuthInitialized(true);
        });

        return () => unsubscribe();
    }, []);

    if (!authInitialized) {
        return <div className='card'>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/' element={<AuthView />} />
                        <Route path={DASHBOARD} element={<Dashboard />} />
                        <Route path={ROLES} element={<RolesController />} />
                        <Route path={USERS} element={<UsersController />} />
                        <Route path={PROJECTS} element={<ProjectsController />} />
                        <Route path={TICKETS} element={<Tickets />} />
                        <Route path={PROFILE} element={<Profile />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;