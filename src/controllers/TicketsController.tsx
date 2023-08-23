import { useSelector } from "react-redux";
import TicketsView from "../views/tickets/TicketsView"
import { RootState } from "../models/redux/store";

const TicketsController = () => {
    const tickets = useSelector((state: RootState) => state.tickets.value);
    const users = useSelector((state: RootState) => state.users.value);
    const projects = useSelector((state: RootState) => state.projects.value);
    return (
        <TicketsView tickets={tickets} users={users} projects={projects} />
    )
}
export default TicketsController
