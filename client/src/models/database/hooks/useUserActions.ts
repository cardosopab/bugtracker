import Company from "./../../Company";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  CompaniesEndpoints,
  UsersEndpoints,
} from "../../../constants/apiEndpoints";
import { setUsers } from "../../redux/usersSlice";
import axios from "axios";
import { handleAxiosError } from "../../../utils/axiosErrorHandler";
import User from "../../User";

export const useUserActions = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const createUser = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const newCompany: Company = {
        _id: "",
        createdAt: new Date(),
        name: "Unassigned",
        personnel: [],
      };
      const companyResponse = await axios.post(
        CompaniesEndpoints.COMPANIES,
        newCompany
      );

      const newUser = {
        name: name,
        email: email,
        password: password,
        role: role,
        companyId: companyResponse.data[0]._id,
      };
      const userResponse = await axios.post(UsersEndpoints.USERS, newUser, {
        withCredentials: true,
      });

      dispatch(setUsers(userResponse.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const findUserByEmail = async (email: string) => {
    try {
      const res = await axios.post(UsersEndpoints.USER_BY_EMAIL, {
        email: email,
      });
      // dispatch(setUsers(res.data));
      return res.data;
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const readUsers = async () => {
    try {
      const res = await axios.get(UsersEndpoints.USERS);
      dispatch(setUsers(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const readCompanyUsers = async (companyId: string) => {
    try {
      const res = await axios.post(UsersEndpoints.USERS_BY_COMPANY, {
        companyId: companyId,
      });
      dispatch(setUsers(res.data));
      // return res.data;
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const readProjectUsers = async (projectId: string) => {
    try {
      const res = await axios.post(UsersEndpoints.USERS_BY_PROJECT, {
        projectId: projectId,
      });
      dispatch(setUsers(res.data));
      // return res.data;
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const updateUser = async (user: User) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    const userWithUserId = { ...user, userId: user._id };

    try {
      const res = await axios.patch(UsersEndpoints.USER_BY_ID, userWithUserId, {
        withCredentials: true,
      });
      dispatch(setUsers(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const res = await axios.patch(
        UsersEndpoints.USER_BY_ID,
        {
          userId: userId,
          role: role,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setUsers(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const res = await axios.delete(UsersEndpoints.USER_BY_ID, {
        withCredentials: true,
        data: {
          userId: userId,
        },
      });
      dispatch(setUsers(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  return {
    createUser,
    findUserByEmail,
    readUsers,
    readCompanyUsers,
    readProjectUsers,
    updateUser,
    updateUserRole,
    deleteUser,
  };
};
