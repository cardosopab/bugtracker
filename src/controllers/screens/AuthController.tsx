import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../../models/database/firebase-init";
import { DASHBOARD_URL } from "../../constants/screensUrls";
import AuthView from "../../views/screens/auth/AuthView";
import { useUserActions } from "../../models/database/hooks/useUserActions";

const AuthController = () => {
  const createUser = useUserActions().createUser;
  const [isSignIn, setIsSignIn] = useState(true);
  const navigateTo = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: any) => {
    console.log(values);
    if (isSignIn) {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((data) => {
          console.log("authData", data);
          navigateTo(DASHBOARD_URL);
        })
        .catch((err) => {
          alert(err.code);
        });
    } else {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((data) => {
          createUser(data.user.uid, values.name, values.email);
          console.log("authData", data);
          navigateTo(DASHBOARD_URL);
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

  const handleDemoLogin = () => {
    signInWithEmailAndPassword(auth, "demo@demo.com", "demo1234")
      .then((data) => {
        console.log("authData", data);
        navigateTo(DASHBOARD_URL);
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  const handleButtonToggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <AuthView
      register={register}
      handleButtonToggle={handleButtonToggle}
      handleSubmit={handleSubmit}
      handleDemoLogin={handleDemoLogin}
      onSubmit={onSubmit}
      isSignIn={isSignIn}
      errors={errors}
    />
  );
};

export default AuthController;
