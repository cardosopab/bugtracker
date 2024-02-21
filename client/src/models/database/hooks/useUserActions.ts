import Company from "./../../Company";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  CompaniesEndpoints,
  UsersEndpoints,
} from "../../../constants/endpoints";
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
    isAdmin: boolean
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
        newCompany,
        {
          withCredentials: true,
        }
      );

      const role = isAdmin ? "Admin" : "Unassigned";
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

      console.log(
        "newCompany",
        JSON.stringify(newCompany),
        "newUser",
        JSON.stringify(newUser)
      );

      dispatch(setUsers(userResponse.data));
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

  const updateUser = async (user: User) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    const userWithUserId = { ...user, userId: user._id };
    console.log("updateUserByIdHandler", JSON.stringify(userWithUserId));

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

  return { createUser, readUsers, updateUser, updateUserRole, deleteUser };
};
