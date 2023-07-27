import { auth } from '../models/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterAndLogin() {
    const [isLogin, setIsLogin] = useState(true);
    const navigateTo = useNavigate();
    const handleSubmit = (e: any, isLogin: boolean) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (isLogin) {
            signInWithEmailAndPassword(auth, email, password).then(data => {
                console.log('authData', data)
                navigateTo('/home')
            }).catch(err => {
                alert(err.code)
            });
        } else {
            createUserWithEmailAndPassword(auth, email, password).then(data => {
                console.log('authData', data)
                navigateTo('/home')
            }).catch(err => {
                alert(err.code)
            });
        }
    }
    return (
        <div className="card">
            <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
            <form onSubmit={(e) => handleSubmit(e, isLogin)}>
                <input type="email" name="email" id="email" placeholder="Email" />
                <input type="password" name="password" id="password" placeholder="Password" />
                <button>{isLogin ? 'Sign In' : 'Sign Up'} </button>
            </form>
        </div>
    )
}
export default RegisterAndLogin