import { useSelector } from "react-redux";
import TicketsView from "../../views/screens/tickets/TicketsView";
import { RootState } from "../../models/redux/store";
import Ticket from "../../models/Ticket";
import { useEffect, useState } from "react";
import { useTicketActions } from "../../models/database/hooks/useTicketActions";

const TicketsController = () => {
  const users = useSelector((state: RootState) => state.users.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { readPaginatedTickets } = useTicketActions();

  const fetchPaginatedTickets = async (page: number) => {
    try {
      const { tickets, currentPage, totalPages } = await readPaginatedTickets(
        page
      );
      setTickets(tickets);
      setPage(currentPage);
      setTotalPages(totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPaginatedTickets(page);
  }, [page, totalPages]);

  const handlePageChange = async (page: number) => {
    const { tickets, currentPage, totalPages } = await readPaginatedTickets(
      page
    );
    setTickets(tickets);
    setPage(currentPage);
    setTotalPages(totalPages);
  };

  return (
    <TicketsView
      tickets={tickets}
      users={users}
      projects={projects}
      page={page}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
};
export default TicketsController;
