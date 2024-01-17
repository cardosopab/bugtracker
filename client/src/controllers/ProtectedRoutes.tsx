import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AuthController from "./screens/AuthController";
import { useSelector } from "react-redux";
import { RootState } from "../models/redux/store";

const ProtectedRoutes = () => {
  // Check if the user is authenticated
  const authStatus = useSelector((state: RootState) => state.auth.authStatus);
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authStatus && location.pathname !== "/") {
      navigateTo("/");
    } else if (authStatus && location.pathname === "/") {
      navigateTo("/dashboard");
    }
  }, [authStatus, navigateTo, location]);

  return authStatus ? <Outlet /> : <AuthController />;
};

export default ProtectedRoutes;
