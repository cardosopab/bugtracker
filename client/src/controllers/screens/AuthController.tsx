import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DASHBOARD_URL } from "../../constants/screensUrls";
import AuthView from "../../views/screens/auth/AuthView";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthStatus, setCurrentUser } from "../../models/redux/authSlice";
import { AuthEndpoints, UsersEndpoints } from "../../constants/endpoints";
import User from "../../models/User";

const AuthController = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const navigateTo = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: any) => {
    const authEndpoint = isSignIn ? AuthEndpoints.LOGIN : UsersEndpoints.USERS;

    axios
      .post(authEndpoint, values, { withCredentials: true })
      .then((res) => {
        const user: User = { ...res.data, _id: res.data.id };
        const isAuth = res.status === 200;
        dispatch(setAuthStatus(isAuth));
        dispatch(setCurrentUser(user));
        navigateTo(DASHBOARD_URL);
      })
      .catch((error) => {
        alert(error.response?.data?.message || "An error occurred");
      });
  };

  const handleDemoLogin = () => {
    const authEndpoint = AuthEndpoints.LOGIN;
    axios
      .post(authEndpoint, { email: "demo@demo.com", password: "test1234" })
      .then((res) => {
        const isAuth = res.status === 200;
        console.log(`isAuth: ${isAuth}`);
        dispatch(setAuthStatus(isAuth));
        navigateTo(DASHBOARD_URL);
      })
      .catch((error) => {
        alert(error.response?.data?.message || "An error occurred");
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
