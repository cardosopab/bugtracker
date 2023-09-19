import { RootState } from "../models/redux/store";
import DrawerController from "./DrawerController";
import ProjectDetailsView from "../views/project_details/ProjectDetailsView";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import { useTicketActions } from "../models/database/hooks/useTicketActions";
import { useProjectActions } from "../models/database/hooks/useProjectActions";
import { useNavigate } from "react-router-dom";
import { PROJECTS_URL } from "../views/viewsUrls";

const ProjectDetailsController = () => {
  const details = useSelector((state: RootState) => state.projectDetails.value);
  let tickets = useSelector((state: RootState) => state.tickets.value);
  const users = useSelector((state: RootState) => state.users.value);
  const [open, setOpen] = useState(false);
  const deleteTicket = useTicketActions().deleteTicket;
  const deleteProject = useProjectActions().deleteProject;
  const navigateTo = useNavigate();

  const handleTicketRemoval = (ticketId: string) => {
    deleteTicket(ticketId);
  };

  const handleProjectRemoval = (projectId: string) => {
    deleteProject(projectId);
    navigateTo(PROJECTS_URL);
  };

  const handleModalToggle = () => {
    setOpen(!open);
  };
  if (details.id === undefined) {
    return (
      <>
        <DrawerController>
          <div className="center">No project was selected.</div>
        </DrawerController>
      </>
    );
  }
  tickets = tickets.filter((ticket) => ticket.projectId === details.id);
  return (
    <>
      <DrawerController>
        <ProjectDetailsView
          details={details}
          users={users}
          tickets={tickets}
          handleTicketRemoval={handleTicketRemoval}
          handleProjectRemoval={handleProjectRemoval}
          handleModalToggle={handleModalToggle}
          open={open}
        />
      </DrawerController>
    </>
  );
};
export default ProjectDetailsController;
