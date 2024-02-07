import { doc, collection, setDoc } from "firebase/firestore";
import { database } from "./../firebase-init";
import {
  USERS_COLLECTION,
  COMPANY_COLLECTION,
} from "../../../constants/collections";
import User from "./../../User";
import Company from "./../../Company";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UsersEndpoints } from "../../../constants/endpoints";
import { setUsers } from "../../redux/usersSlice";
import axios from "axios";

export const useUserActions = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const createUser = async (uid: string, name: string, email: string) => {
    try {
      const docRef = doc(collection(database, USERS_COLLECTION), uid);
      const companyRef = doc(collection(database, COMPANY_COLLECTION));

      const date = new Date();
      const newUser: User = {
        _id: uid,
        createdAt: date,
        name: name,
        email: email,
        role: "Unassigned",
        companyId: companyRef.id,
      };
      const newCompany: Company = {
        _id: companyRef.id,
        createdAt: date,
        name: "Unassigned",
        personnel: [uid],
      };
      await setDoc(docRef, newUser);
      await setDoc(companyRef, newCompany);
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  const readUsers = async () => {
    try {
      const res = await axios.get(UsersEndpoints.USERS);
      dispatch(setUsers(res.data));
    } catch (error: any) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.status);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received from the server");
        alert("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const updateUserRole = async (uid: string, role: string) => {
    if (currentUser.role === "Demo") {
      return;
    }

    const user = doc(database, USERS_COLLECTION, uid);
    setDoc(user, { role: role }, { merge: true });
  };

  return { createUser, readUsers, updateUserRole };
};
