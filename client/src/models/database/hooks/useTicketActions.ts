import { doc, collection, setDoc, deleteDoc } from "firebase/firestore";
import { database } from "./../firebase-init";
import { TICKETS_COLLECTION } from "../../../constants/collections";
import Ticket from "./../../Ticket";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useTicketActions = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

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
    if (currentUser.role === "Demo") {
      return;
    }

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
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  const updateTicket = async (ticketId: string, ticket: Ticket) => {
    if (currentUser.role === "Demo") {
      return;
    }

    try {
      const docRef = doc(database, TICKETS_COLLECTION, ticketId);
      await setDoc(docRef, ticket);
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  const deleteTicket = async (ticketId: string) => {
    if (currentUser.role === "Demo") {
      return;
    }

    try {
      const docRef = doc(database, TICKETS_COLLECTION, ticketId);
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  return { createTicket, updateTicket, deleteTicket };
};
