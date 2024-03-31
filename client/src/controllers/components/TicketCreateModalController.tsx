import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import { useEffect, useState } from "react";
import Project from "../../models/Project";
import { useTicketActions } from "../../models/database/hooks/useTicketActions";
import TicketCreateModalView from "../../views/components/ticket_create_modal/TicketCreateModalView";
import Ticket from "../../models/Ticket";
import { useUserActions } from "../../models/database/hooks/useUserActions";

interface CreateTicketProps {
  project: Project;
}

const TicketCreateModalController = ({ project }: CreateTicketProps) => {
  const createTicket = useTicketActions().createTicket;
  const projects = useSelector((state: RootState) => state.projects.value);
  const users = useSelector((state: RootState) => state.users.value);
  const { readProjectUsers } = useUserActions();
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
    const currentUserId = currentUser!._id;
    const personnelId =
      users.find((user) => user.name === selectedPersonnel)?._id ?? "";
    const projectId =
      project?._id ??
      projects.find((project) => project.name == selectedProject)!._id;
    const companyId = currentUser?.companyId ?? "0";
    const newTicket: Ticket = {
      _id: "",
      title: titleValue,
      description: descriptionValue,
      projectId: projectId,
      companyId: companyId,
      submitterId: currentUserId,
      personnelId: personnelId,
      priority: selectedPriority,
      status: selectedStatus,
      type: selectedType,
      comments: [],
      createdAt: new Date(),
    };
    createTicket(newTicket);
    handleModalToggle();
    setSelectedProject("");
    setSelectedPriority("");
    setSelectedType("");
    setSelectedPersonnel("");
    setSelectedStatus("");
    setTitleValue("");
    setDescriptionValue("");
  };

  useEffect(() => {
    readProjectUsers(project!._id);
  }, [project]);
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
