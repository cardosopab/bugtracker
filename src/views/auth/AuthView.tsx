import { auth } from '../../models/database/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD } from '../viewsUrls';
import { Button, Card, Input } from '@mui/material';
import { useForm } from "react-hook-form";

const AuthView = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigateTo = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = (values: any) => {
        console.log(values);
        if (isLogin) {
            signInWithEmailAndPassword(auth, values.email, values.password).then(data => {
                console.log('authData', data)
                navigateTo(DASHBOARD)
            }).catch(err => {
                alert(err.code)
            });
        } else {
            createUserWithEmailAndPassword(auth, values.email, values.password).then(data => {
                console.log('authData', data)
                navigateTo(DASHBOARD)
            }).catch(err => {
                alert(err.code)
            });
        }
    };

    return (<div className="auth-card">
        <Card>

            <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="email"
                    {...register("email", {
                        required: "Required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                />
                {/* {errors.email && errors.email.message} */}

                <Input
                    type="password"
                    {...register("password", {
                        // validate: value => value !== "admin" || "Nice try!"
                        required: "Required",

                    })}
                />
                {/* {errors.username && errors.username.message} */}

                {/* <button type="submit">Submit</button> */}
                <Button type="submit" variant="contained">{isLogin ? 'Sign In' : 'Sign Up'}</Button>
            </form>
        </Card>
    </div>
    );
};

export default AuthView;