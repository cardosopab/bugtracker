import { RootState } from "../models/redux/store";
import DrawerController from "./DrawerController";
import ProjectDetailsView from "../views/project_details/ProjectDetailsView";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";

const ProjectDetailsController = () => {
  const details = useSelector((state: RootState) => state.projectDetails.value);
  let tickets = useSelector((state: RootState) => state.tickets.value);
  const users = useSelector((state: RootState) => state.users.value);
  const [openEditModal, setOpenEditModal] = useState<{ [id: string]: boolean }>(
    {}
  );

  const handleEditToggle = (ticketId: string) => {
    setOpenEditModal((prevOpenTickets) => ({
      ...prevOpenTickets,
      [ticketId]: !prevOpenTickets[ticketId],
    }));
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
          project={details}
          users={users}
          tickets={tickets}
          handleEditToggle={handleEditToggle}
          openEditModal={openEditModal}
        />
      </DrawerController>
    </>
  );
};
export default ProjectDetailsController;
