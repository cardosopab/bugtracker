import { doc, collection, setDoc } from "firebase/firestore";
import { database } from "./../firebase-init";
import { USERS_COLLECTION, COMPANY_COLLECTION } from "./../collections";
import User from "./../../User";
import Company from "./../../Company";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useUserActions = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const createUser = async (uid: string, name: string, email: string) => {
    try {
      const docRef = doc(collection(database, USERS_COLLECTION), uid);
      const companyRef = doc(collection(database, COMPANY_COLLECTION));

      const date = Date.now();
      const newUser: User = {
        id: uid,
        createdAt: date,
        name: name,
        email: email,
        role: "Unassigned",
        companyId: companyRef.id,
      };
      const newCompany: Company = {
        id: companyRef.id,
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

  const updateUserRole = async (uid: string, role: string) => {
    if (currentUser.role === "Demo") {
      return;
    }

    const user = doc(database, USERS_COLLECTION, uid);
    setDoc(user, { role: role }, { merge: true });
  };

  return { createUser, updateUserRole };
};
