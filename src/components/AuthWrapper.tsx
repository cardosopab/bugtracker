import { useNavigate } from 'react-router-dom';
import { auth } from '../models/firebase-config';
import RegisterAndLogin from './RegisterAndLogin';
import Home from './Home';

function AuthWrapper() {
    const navigate = useNavigate();

    // Check if the user is authenticated
    const isAuth = auth.currentUser !== null;

    // If not authenticated, redirect to the login/register page
    if (!isAuth) {
        navigate('/');
        return <RegisterAndLogin />;
    }

    // If authenticated, show the Home component
    navigate('/home');
    return <Home />;
}

export default AuthWrapper;
