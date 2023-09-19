import { doc, collection, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { database } from "./../firebase-init";
import { TICKETS_COLLECTION } from "./../collections";
import Ticket from "./../../Ticket";

export const useTicketActions = () => {
    const createTicket = async (
        projectId: string,
        companyId: string,
        submitterId: string,
        personnelId: string,
        title: string,
        description: string,
        priority: string,
        status: string,
        type: string
    ) => {
        try {
            const docRef = doc(collection(database, TICKETS_COLLECTION));

            const newTicket: Ticket = {
                id: docRef.id,
                projectId: projectId,
                companyId: companyId,
                submitterId: submitterId,
                title: title,
                description: description,
                personnelId: personnelId,
                priority: priority,
                status: status,
                type: type,
                createdAt: Date.now(),
                comments: [],
            };
            await setDoc(docRef, newTicket);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
            return null;
        }
    };

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

    const deleteTicket = async (ticketId: string) => {
        try {
            const docRef = doc(database, TICKETS_COLLECTION, ticketId);
            await deleteDoc(docRef);
            console.log("Document removed with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
            return null;
        }
    };

    return { createTicket, updateTicket, deleteTicket };
};