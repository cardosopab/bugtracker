import { useSelector } from "react-redux";
import TicketsView from "../../views/screens/tickets/TicketsView";
import { RootState } from "../../models/redux/store";
import { useEffect, useState } from "react";
import { useUserActions } from "../../models/database/hooks/useUserActions";
import { useTicketActions } from "../../models/database/hooks/useTicketActions";

const TicketsController = () => {
  const tickets = useSelector((state: RootState) => state.tickets.value);
  const users = useSelector((state: RootState) => state.users.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const [openTickets, setOpenTickets] = useState<{ [id: string]: boolean }>({});
  const { readUsers } = useUserActions();
  const { readTickets } = useTicketActions();

  const handleModal = (ticketId: string) => {
    setOpenTickets((prevOpenTickets) => ({
      ...prevOpenTickets,
      [ticketId]: !prevOpenTickets[ticketId],
    }));
  };

  useEffect(() => {
    readUsers();
    readTickets();
  }, []);

  return (
    <TicketsView
      tickets={tickets}
      users={users}
      projects={projects}
      openTickets={openTickets}
      handleModal={handleModal}
    />
  );
};
export default TicketsController;
