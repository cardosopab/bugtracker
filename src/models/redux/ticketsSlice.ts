import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Ticket from "../Ticket";

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    value: [] as Ticket[],
  },
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
