import { Outlet, useNavigate } from 'react-router-dom';
import RegisterAndLogin from './RegisterAndLogin';
import { auth } from '../models/database/firebase-config';
import { useEffect } from 'react';

function ProtectedRoutes() {
    // Check if the user is authenticated
    const isAuth = auth.currentUser !== null;
    console.log('ProtectedRoutes', isAuth)
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigateTo('/')
        }
    }, [isAuth, navigateTo]);
    return isAuth ? <Outlet /> : <RegisterAndLogin />;
}

export default ProtectedRoutes;