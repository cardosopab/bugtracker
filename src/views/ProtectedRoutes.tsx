import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AuthController from '../controllers/AuthController';
import { useSelector } from 'react-redux';
import { RootState } from '../models/redux/store';

function ProtectedRoutes() {
    // Check if the user is authenticated
    const authStatus = useSelector((state: RootState) => state.auth.authStatus)
    console.log('ProtectedRoutes', authStatus)
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!authStatus) {
            navigateTo('/')
        }
    }, [authStatus, navigateTo]);
    return authStatus ? <Outlet /> : <AuthController />;
}

export default ProtectedRoutes;