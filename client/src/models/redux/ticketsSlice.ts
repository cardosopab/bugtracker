import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Ticket from "../Ticket";

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [] as Ticket[],
    page: 0 as number,
    totalPages: 0 as number,
  },
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    setTicketsData: (
      state,
      action: PayloadAction<{
        tickets: Ticket[];
        page: number;
        totalPages: number;
      }>
    ) => {
      state.tickets = action.payload.tickets;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setTickets, setTicketsData } = ticketsSlice.actions;

export default ticketsSlice.reducer;
