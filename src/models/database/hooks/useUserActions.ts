import { doc, collection, setDoc } from "firebase/firestore";
import { database } from "./../firebase-init";
import { USERS_COLLECTION, COMPANY_COLLECTION } from "./../collections";
import User from "./../../User";
import Company from "./../../Company";

export const useUserActions = () => {
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
                role: 'Unassigned',
                companyId: companyRef.id,
            };
            const newCompany: Company = {
                id: companyRef.id,
                createdAt: date,
                name: 'Unassigned',
                personnel: [uid],
            };
            await setDoc(docRef, newUser);
            await setDoc(companyRef, newCompany);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
            return null;
        }
    };

    const updateUserRole = async (uid: string, role: string) => {
        const user = doc(database, USERS_COLLECTION, uid);
        setDoc(user, { role: role }, { merge: true });
    };

    return { createUser, updateUserRole };
};
