import { arrayRemove, arrayUnion, collection, deleteDoc, doc, setDoc, updateDoc, } from "firebase/firestore";
import { database } from "./firebase-init";
import Project from "../Project";
import { PROJECTS_COLLECTION, USERS_COLLECTION, TICKETS_COLLECTION } from "./collections";
import User from "../User";
import Ticket from "../Ticket";

const createProject = async (name: string, description: string) => {
    try {
        const docRef = doc(collection(database, PROJECTS_COLLECTION));

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

const removeUserFromProject = async (uid: string, projectId: string) => {
    try {
        const docRef = doc(database, PROJECTS_COLLECTION, projectId);
        await updateDoc(docRef, {
            personnel: arrayRemove(uid)
        });
        console.log("Document removed with ID: ", docRef.id);

    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

const addUserToProject = async (uid: string, projectId: string) => {
    try {
        const docRef = doc(database, PROJECTS_COLLECTION, projectId);
        await setDoc(docRef, { personnel: arrayUnion(uid) }, { merge: true });
        console.log("Document written with ID: ", docRef.id);

    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

const createUser = async (name: string, email: string) => {
    try {
        const docRef = doc(collection(database, USERS_COLLECTION));

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
    const user = doc(database, USERS_COLLECTION, uid);
    setDoc(user, { role: role }, { merge: true });
}

const createTicket = async (projectId: string, submitterId: string, personnelId: string, title: string, description: string, priority: string, status: string, type: string) => {
    try {
        const docRef = doc(collection(database, TICKETS_COLLECTION));

        // Create the User object with the generated ID
        const newTicket: Ticket = {
            id: docRef.id,
            projectId: projectId,
            submitterId: submitterId,
            title: title,
            description: description,
            personnelId: personnelId,
            priority: priority,
            status: status,
            type: type,
            createdAt: Date.now(),
            comments: [],
        }
        await setDoc(docRef, newTicket);
        console.log("Document written with ID: ", docRef.id);

    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }

}

const updateTicket = async (ticketId: string, ticket: Ticket) => {
    try {
        const docRef = doc(database, TICKETS_COLLECTION, ticketId);
        await setDoc(docRef, ticket);
        console.log("Updated document with ID: ", docRef.id);

    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

const removeTicket = async (ticketId: string) => {
    try {
        const docRef = doc(database, TICKETS_COLLECTION, ticketId);
        await deleteDoc(docRef);
        console.log("Document removed with ID: ", docRef.id);

    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

export { createProject, addUserToProject, removeUserFromProject, createUser, updateUserRole, createTicket, updateTicket, removeTicket };
