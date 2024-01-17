import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import { useState } from "react";
import Project from "../../models/Project";
import { useTicketActions } from "../../models/database/hooks/useTicketActions";
import TicketCreateModalView from "../../views/components/ticket_create_modal/TicketCreateModalView";

interface CreateTicketProps {
  project?: Project;
}

const TicketCreateModalController = ({ project }: CreateTicketProps) => {
  const createTicket = useTicketActions().createTicket;
  const projects = useSelector((state: RootState) => state.projects.value);
  const users = useSelector((state: RootState) => state.users.value);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPersonnel, setSelectedPersonnel] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleModalToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleTitleChange = (event: any) => {
    setTitleValue(event.target.value);
  };
  const handleDescriptionChange = (event: any) => {
    setDescriptionValue(event.target.value);
  };

  const handleTicketCreate = () => {
    const personnelId = users.find(
      (user) => user.name === selectedPersonnel
    )?.id;
    createTicket(
      project?.id ??
        projects.find((project) => project.name == selectedProject)!.id,
      currentUser?.companyId ?? "0",
      currentUser.id,
      personnelId!,
      titleValue,
      descriptionValue,
      selectedPriority,
      selectedStatus,
      selectedType
    );
    handleModalToggle();
    setSelectedProject("");
    setSelectedPriority("");
    setSelectedType("");
    setSelectedPersonnel("");
    setSelectedStatus("");
    setTitleValue("");
    setDescriptionValue("");
  };

  return (
    <TicketCreateModalView
      project={project}
      projects={projects}
      users={users}
      titleValue={titleValue}
      descriptionValue={descriptionValue}
      selectedPersonnel={selectedPersonnel}
      selectedPriority={selectedPriority}
      selectedProject={selectedProject}
      selectedStatus={selectedStatus}
      selectedType={selectedType}
      setSelectedPersonnel={setSelectedPersonnel}
      setSelectedPriority={setSelectedPriority}
      setSelectedProject={setSelectedProject}
      setSelectedStatus={setSelectedStatus}
      setSelectedType={setSelectedType}
      open={open}
      handleTitleChange={handleTitleChange}
      handleDescriptionChange={handleDescriptionChange}
      handleModalToggle={handleModalToggle}
      handleTicketCreate={handleTicketCreate}
    />
  );
};

export default TicketCreateModalController;
