import { collection, doc, setDoc } from "firebase/firestore";
import { database } from "./firebase-config";
import Project from "../Project";
import { PROJECTS, USERS } from "./databaseEndpoints";
import User from "../User";

const createProject = async (name: string, description: string) => {
    try {
        const docRef = doc(collection(database, PROJECTS));

        // Create the Project object with the generated ID
        const newProject: Project = {
            id: docRef.id,
            name: name,
            description: description,
            createdAt: Date.now(),
            personnel: [],
        };

        await setDoc(docRef, newProject);
        console.log("Document written with ID: ", docRef.id);

    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

const createUser = async (name: string, email: string) => {
    try {
        const docRef = doc(collection(database, USERS));

        // Create the User object with the generated ID
        const newUser: User = {
            id: docRef.id,
            createdAt: Date.now(),
            name: name,
            email: email,
            role: "",
        }
        await setDoc(docRef, newUser);
        console.log("Document written with ID: ", docRef.id);

    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }

}

const updateUserRole = async (uid: string, role: string) => {
    const user = doc(database, USERS, uid);
    setDoc(user, { role: role }, { merge: true });
}

export { createProject, createUser, updateUserRole };