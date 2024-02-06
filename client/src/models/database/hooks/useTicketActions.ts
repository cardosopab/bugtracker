import Ticket from "./../../Ticket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { TicketsEndpoints } from "../../../constants/endpoints";
import { setTickets } from "../../redux/ticketsSlice";

export const useTicketActions = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const createTicket = async (ticket: Ticket) => {
    if (currentUser.role === "Demo") {
      return;
    }

    try {
      const res = await axios.post(TicketsEndpoints.TICKETS, ticket);
      dispatch(setTickets(res.data));
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

  const readTickets = async () => {
    try {
      const res = await axios.get(TicketsEndpoints.TICKETS);
      dispatch(setTickets(res.data));
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

  const updateTicket = async (ticketId: string, ticket: Ticket) => {
    if (currentUser.role === "Demo") {
      return;
    }

    console.log(ticketId, ticket);
    // try {
    //   const docRef = doc(database, TICKETS_COLLECTION, ticketId);
    //   await setDoc(docRef, ticket);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    //   return null;
    // }
  };

  const deleteTicket = async (ticketId: string) => {
    if (currentUser.role === "Demo") {
      return;
    }

    try {
      const res = await axios.delete(TicketsEndpoints.TICKET_BY_ID, {
        data: { ticketId: ticketId },
      });
      dispatch(setTickets(res.data));
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

  return { createTicket, readTickets, updateTicket, deleteTicket };
};
