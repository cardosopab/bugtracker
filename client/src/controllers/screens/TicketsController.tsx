import { useSelector } from "react-redux";
import TicketsView from "../../views/screens/tickets/TicketsView";
import { RootState } from "../../models/redux/store";
import { useEffect } from "react";
import { useTicketActions } from "../../models/database/hooks/useTicketActions";
import { useUserActions } from "../../models/database/hooks/useUserActions";
import { useProjectActions } from "../../models/database/hooks/useProjectActions";

const TicketsController = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const companyId = user!.companyId;
  const { tickets, page, totalPages } = useSelector(
    (state: RootState) => state.tickets
  );
  const users = useSelector((state: RootState) => state.users.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const { readPaginatedTickets } = useTicketActions();
  const { readCompanyUsers } = useUserActions();
  const { readCompanyProjects } = useProjectActions();

  useEffect(() => {
    readPaginatedTickets(page, companyId);
  }, [page, companyId]);

  useEffect(() => {
    readCompanyUsers(companyId);

    readCompanyProjects(companyId);
  }, [companyId]);

  const handlePageChange = async (page: number) => {
    await readPaginatedTickets(page, user!.companyId);
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
