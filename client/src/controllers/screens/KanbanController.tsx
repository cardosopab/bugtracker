import { SelectChangeEvent, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import Ticket from "../../models/Ticket";
import { useEffect, useState } from "react";
import Project from "../../models/Project";
import KanbanView from "../../views/screens/kanban/KanbanView";
import { useTicketActions } from "../../models/database/hooks/useTicketActions";
import { useProjectActions } from "../../models/database/hooks/useProjectActions";

const KanbanController = () => {
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const projects = useSelector((state: RootState) => state.projects.value);
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const companyId = user!.companyId;
  const { readCompanyTickets } = useTicketActions();
  const { readCompanyProjects } = useProjectActions();
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const [ticketsByStatus, setTicketsByStatus] = useState<{
    [status: string]: Ticket[];
  }>({});

  useEffect(() => {
    readCompanyProjects(companyId);
    readCompanyTickets(companyId);
  }, [companyId]);

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  useEffect(() => {
    if (selectedProject) {
      const updatedTicketsByStatus: { [status: string]: Ticket[] } = {};

      tickets.forEach((ticket: Ticket) => {
        if (ticket.projectId === selectedProject._id) {
          if (!updatedTicketsByStatus[ticket.status]) {
            updatedTicketsByStatus[ticket.status] = [];
          }
          updatedTicketsByStatus[ticket.status].push(ticket);
        }
      });

      setTicketsByStatus(updatedTicketsByStatus);
    }
  }, [selectedProject, tickets]);

  const handleProjectDropdown = (event: SelectChangeEvent) => {
    const selectedProjectName = event.target.value as string;
    const selectedProjectObj = projects.find(
      (project) => project.name === selectedProjectName
    );

    if (selectedProjectObj) {
      setSelectedProject(selectedProjectObj);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for sm screen

  return (
    <KanbanView
      projects={projects}
      selectedProject={selectedProject}
      isMobile={isMobile}
      handleProjectDropdown={handleProjectDropdown}
      ticketsByStatus={ticketsByStatus}
    />
  );
};

export default KanbanController;
