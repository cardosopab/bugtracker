import { useSelector } from "react-redux";
import TicketsView from "../views/tickets/TicketsView"
import { RootState } from "../models/redux/store";
import { useState } from "react";

const TicketsController = () => {
    const tickets = useSelector((state: RootState) => state.tickets.value);
    const users = useSelector((state: RootState) => state.users.value);
    const projects = useSelector((state: RootState) => state.projects.value);
    const [openTickets, setOpenTickets] = useState<Array<boolean>>([]);

    const handleModal = (index: number) => {
        const updatedOpenTickets = [...openTickets];
        updatedOpenTickets[index] = !updatedOpenTickets[index];
        setOpenTickets(updatedOpenTickets);
    };

    return (
        <TicketsView tickets={tickets} users={users} projects={projects} openTickets={openTickets} handleModal={handleModal} />
    )
}
export default TicketsController
