import Ticket from "./../../Ticket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { TicketsEndpoints } from "../../../constants/apiEndpoints";
import { setTickets } from "../../redux/ticketsSlice";
import { handleAxiosError } from "../../../utils/axiosErrorHandler";

export const useTicketActions = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const createTicket = async (ticket: Ticket) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const res = await axios.post(TicketsEndpoints.TICKETS, ticket);
      dispatch(setTickets(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const readTickets = async () => {
    try {
      const res = await axios.get(TicketsEndpoints.TICKETS);
      dispatch(setTickets(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const readPaginatedTickets = async (page: number) => {
    const pageSize = 6;
    try {
      const res = await axios.post(TicketsEndpoints.TICKET_BY_PAGE, {
        page: page,
        pageSize: pageSize,
      });
      return res.data;
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const updateTicket = async (ticket: Ticket) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    const ticketWithTicketId = { ...ticket, ticketId: ticket._id };

    try {
      const res = await axios.patch(
        TicketsEndpoints.TICKET_BY_ID,
        ticketWithTicketId
      );
      dispatch(setTickets(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const deleteTicket = async (ticketId: string) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const res = await axios.delete(TicketsEndpoints.TICKET_BY_ID, {
        data: { ticketId: ticketId },
      });
      dispatch(setTickets(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  return {
    createTicket,
    readTickets,
    readPaginatedTickets,
    updateTicket,
    deleteTicket,
  };
};
