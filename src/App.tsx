import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { useEffect, useState } from 'react';
import { auth } from './models/firebase-config';
import ProtectedRoutes from './components/ProtectedRoutes';
import RegisterAndLogin from './components/RegisterAndLogin';
import AuthWrapper from './components/AuthWrapper';

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
                    <Route element={<AuthWrapper />}>
                        <Route path='/' element={<RegisterAndLogin />} />
                    </Route>
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/home' element={<Home />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
