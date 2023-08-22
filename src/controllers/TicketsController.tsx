import { useSelector } from "react-redux";
import TicketsView from "../views/tickets/TicketsView"
import { RootState } from "../models/redux/store";

const TicketsController = () => {
    const tickets = useSelector((state: RootState) => state.tickets.value);
    return (
        <TicketsView tickets={tickets} />
    )
}
export default TicketsController