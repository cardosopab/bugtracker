import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import { useState } from "react";
import Ticket from "../../models/Ticket";
import { useTicketActions } from "../../models/database/hooks/useTicketActions";
import TicketEditModalView from "../../views/components/ticket_edit_modal/TicketEditModalView";

interface EditTicketProps {
  ticket: Ticket;
  title?: string;
}
const TicketEditModalController = ({ ticket, title }: EditTicketProps) => {
  const deleteTicket = useTicketActions().deleteTicket;
  const updateTicket = useTicketActions().updateTicket;
  const projects = useSelector((state: RootState) => state.projects.value);
  const users = useSelector((state: RootState) => state.users.value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleValue, setTitleValue] = useState(ticket.title);
  const [descriptionValue, setDescriptionValue] = useState(ticket.description);
  const [selectedProject, setSelectedProject] = useState(
    projects.find((project) => project._id === ticket.projectId)?.name ??
      projects[0].name
  );
  const [selectedPriority, setSelectedPriority] = useState(ticket.priority);
  const [selectedType, setSelectedType] = useState(ticket.type);
  const [selectedPersonnel, setSelectedPersonnel] = useState(
    users.find((user) => user._id === ticket.personnelId)?.name ?? users[0].name
  );
  const [selectedStatus, setSelectedStatus] = useState(ticket.status);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleUpdate = (tickeId: string, ticket: Ticket) => {
    handleModalToggle();
    updateTicket(tickeId, ticket);
  };
  const handleTicketRemoval = (ticketId: string) => {
    deleteTicket(ticketId);
  };

  return (
    <TicketEditModalView
      users={users}
      projects={projects}
      title={title}
      isModalOpen={isModalOpen}
      ticket={ticket}
      titleValue={titleValue}
      descriptionValue={descriptionValue}
      selectedPersonnel={selectedPersonnel}
      selectedPriority={selectedPriority}
      selectedProject={selectedProject}
      selectedStatus={selectedStatus}
      selectedType={selectedType}
      setTitleValue={setTitleValue}
      setDescriptionValue={setDescriptionValue}
      setSelectedPersonnel={setSelectedPersonnel}
      setSelectedProject={setSelectedProject}
      setSelectedPriority={setSelectedPriority}
      setSelectedStatus={setSelectedStatus}
      setSelectedType={setSelectedType}
      handleUpdate={handleUpdate}
      handleModalToggle={handleModalToggle}
      handleTicketRemoval={handleTicketRemoval}
    />
  );
};

export default TicketEditModalController;
