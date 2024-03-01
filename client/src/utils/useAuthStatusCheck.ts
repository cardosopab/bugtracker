import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AuthEndpoints } from "../constants/endpoints";
import { setAuthStatus, setCurrentUser } from "../models/redux/authSlice";
import User from "../models/User";

const useAuthStatusCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(AuthEndpoints.STATUS, {
          withCredentials: true,
        });
        const status = res.status;
        const isAuth = status === 200;

        if (isAuth) {
          // User is authenticated
          const user: User = { ...res.data, _id: res.data.id };
          dispatch(setAuthStatus(isAuth));
          dispatch(setCurrentUser(user));
        }
      } catch (error) {
        // Handle error if needed
        // console.error("Error checking auth status:", error);
        console.clear();
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  return null; 
};

export default useAuthStatusCheck;
