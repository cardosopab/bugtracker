import { SelectChangeEvent, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import Ticket from "../../models/Ticket";
import { useEffect, useState } from "react";
import Project from "../../models/Project";
import KanbanView from "../../views/screens/kanban/KanbanView";

const KanbanController = () => {
  const tickets = useSelector((state: RootState) => state.tickets.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  );
  const [ticketsByStatus, setTicketsByStatus] = useState<{
    [status: string]: Ticket[];
  }>({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for sm screen

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  useEffect(() => {
    if (selectedProject) {
      const updatedTicketsByStatus: { [status: string]: Ticket[] } = {};

      tickets.forEach((ticket: Ticket) => {
        if (ticket.projectId === selectedProject.id) {
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
