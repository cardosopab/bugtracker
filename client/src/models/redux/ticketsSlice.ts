import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Ticket from "../Ticket";

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [] as Ticket[],
    paginatedTickets: [] as Ticket[],
    page: 0 as number,
    totalPages: 0 as number,
  },
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    setPaginatedTickets: (
      state,
      action: PayloadAction<{
        paginatedTickets: Ticket[];
        page: number;
        totalPages: number;
      }>
    ) => {
      state.paginatedTickets = action.payload.paginatedTickets;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setTickets, setPaginatedTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
