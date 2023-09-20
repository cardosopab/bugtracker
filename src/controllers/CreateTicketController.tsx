import {
  Button,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../models/redux/store";
import { useState } from "react";
import Project from "../models/Project";
import {
  priorityOptions,
  statusOptions,
  typeOptions,
} from "../constants/ticketConstants";
import { useTicketActions } from "../models/database/hooks/useTicketActions";

interface CreateTicketProps {
  project: Project | null;
  handleModal: any;
}
const CreateTicketController = (props: CreateTicketProps) => {
  const createTicket = useTicketActions().createTicket;
  const { project, handleModal } = props;
  const projects = useSelector((state: RootState) => state.projects.value);
  const users = useSelector((state: RootState) => state.users.value);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPersonnel, setSelectedDeveloper] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

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
    handleModal();
  };
  return (
    <Card>
      <CardHeader
        title={`Create Ticket${project == null ? "" : ` for ${project?.name}`}`}
      />
      <Table style={{ tableLayout: "fixed" }}>
        <TableBody>
          <TableRow>
            <TableCell style={{ width: "50%", verticalAlign: "top" }}>
              <FormControl fullWidth={true} margin={"normal"}>
                <InputLabel htmlFor="title-input">Title</InputLabel>
                <Input
                  id="title-input"
                  value={titleValue}
                  onChange={handleTitleChange}
                />
              </FormControl>
              {!project && (
                <FormControl fullWidth={true} margin={"normal"} color="success">
                  <InputLabel id="project-dropdown-label">Project</InputLabel>
                  <Select
                    labelId="project-dropdown-label"
                    label="Project"
                    id="project-dropdown"
                    value={selectedProject} // Connect to state
                    onChange={(event) => setSelectedProject(event.target.value)} // Update state on change
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.name}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <FormControl fullWidth={true} margin={"normal"}>
                <InputLabel id="priority-dropdown-label">
                  Ticket Priority
                </InputLabel>
                <Select
                  labelId="priority-dropdown-label"
                  label="Ticket Priority"
                  id="priority-dropdown"
                  value={selectedPriority} // Connect to state
                  onChange={(event) => setSelectedPriority(event.target.value)} // Update state on change
                >
                  {priorityOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth={true} margin={"normal"}>
                <InputLabel id="type-dropdown-label">Ticket Type</InputLabel>
                <Select
                  labelId="type-dropdown-label"
                  label="Ticket Type"
                  id="type-dropdown"
                  value={selectedType} // Connect to state
                  onChange={(event) => setSelectedType(event.target.value)} // Update state on change
                >
                  {typeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell style={{ width: "50%", verticalAlign: "top" }}>
              <FormControl fullWidth={true} margin={"normal"}>
                <InputLabel htmlFor="description-input">Description</InputLabel>
                <Input
                  id="description-input"
                  multiline
                  rows={4}
                  value={descriptionValue}
                  onChange={handleDescriptionChange}
                />
              </FormControl>
              <FormControl fullWidth={true} margin={"normal"}>
                <InputLabel id="developer-dropdown-label">Personnel</InputLabel>
                <Select
                  labelId="developer-dropdown-label"
                  label="Developer"
                  id="developer-dropdown"
                  value={selectedPersonnel} // Connect to state
                  onChange={(event) => setSelectedDeveloper(event.target.value)} // Update state on change
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.name}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth={true} margin={"normal"}>
                <InputLabel id="status-dropdown-label">Status</InputLabel>
                <Select
                  fullWidth={true}
                  labelId="status-dropdown-label"
                  label="Status"
                  id="status-dropdown"
                  value={selectedStatus} // Connect to state
                  onChange={(event) => setSelectedStatus(event.target.value)} // Update state on change
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align="right">
              {/* <Button>Back to List</Button> */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleTicketCreate}
              >
                Create Ticket
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default CreateTicketController;
