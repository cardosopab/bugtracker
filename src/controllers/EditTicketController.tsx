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
  Modal,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../models/redux/store";
import { useState } from "react";
import Ticket from "../models/Ticket";
import {
  priorityOptions,
  statusOptions,
  typeOptions,
} from "../constants/ticketConstants";
import { useTicketActions } from "../models/database/hooks/useTicketActions";

interface EditTicketProps {
  ticket: Ticket;
  title?: string;
}
const EditTicketController = ({ ticket, title }: EditTicketProps) => {
  const deleteTicket = useTicketActions().deleteTicket;
  const updateTicket = useTicketActions().updateTicket;
  const projects = useSelector((state: RootState) => state.projects.value);
  const users = useSelector((state: RootState) => state.users.value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleValue, setTitleValue] = useState(ticket.title);
  const [descriptionValue, setDescriptionValue] = useState(ticket.description);
  const [selectedProject, setSelectedProject] = useState(
    projects.find((project) => project.id === ticket.projectId)?.name
  );
  const [selectedPriority, setSelectedPriority] = useState(ticket.priority);
  const [selectedType, setSelectedType] = useState(ticket.type);
  const [selectedPersonnel, setSelectedPersonnel] = useState(
    users.find((user) => user.id === ticket.personnelId)?.name
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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
  };

  return (
    <>
      <Button
        fullWidth
        style={{ justifyContent: "flex-start" }}
        onClick={() => handleModalToggle()}
      >
        {title ? title : "Edit"}
      </Button>
      <Modal open={isModalOpen} onClose={() => handleModalToggle()}>
        <Card style={style}>
          <CardHeader title={`Edit Ticket: ${ticket.title}`} />
          <Table style={{ tableLayout: "fixed" }}>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: "50%", verticalAlign: "top" }}>
                  <FormControl fullWidth={true} margin={"normal"}>
                    <InputLabel htmlFor="title-input">Title</InputLabel>
                    <Input
                      id="title-input"
                      value={titleValue}
                      onChange={(event) => setTitleValue(event.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth={true} margin={"normal"}>
                    <InputLabel id="project-dropdown-label">Project</InputLabel>
                    <Select
                      labelId="project-dropdown-label"
                      label="Project"
                      id="project-dropdown"
                      value={selectedProject} // Connect to state
                      onChange={(event) =>
                        setSelectedProject(event.target.value)
                      } // Update state on change
                    >
                      {projects.map((project) => (
                        <MenuItem key={project.id} value={project.name}>
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth={true} margin={"normal"}>
                    <InputLabel id="priority-dropdown-label">
                      Ticket Priority
                    </InputLabel>
                    <Select
                      labelId="priority-dropdown-label"
                      label="Ticket Priority"
                      id="priority-dropdown"
                      value={selectedPriority} // Connect to state
                      onChange={(event) =>
                        setSelectedPriority(event.target.value)
                      } // Update state on change
                    >
                      {priorityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth={true} margin={"normal"}>
                    <InputLabel id="type-dropdown-label">
                      Ticket Type
                    </InputLabel>
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
                    <InputLabel htmlFor="description-input">
                      Description
                    </InputLabel>
                    <Input
                      id="description-input"
                      value={descriptionValue}
                      onChange={(event) =>
                        setDescriptionValue(event.target.value)
                      }
                      multiline
                      rows={4}
                    />
                  </FormControl>
                  <FormControl fullWidth={true} margin={"normal"}>
                    <InputLabel id="developer-dropdown-label">
                      Personnel
                    </InputLabel>
                    <Select
                      labelId="developer-dropdown-label"
                      label="Personnel"
                      id="developer-dropdown"
                      value={selectedPersonnel} // Connect to state
                      onChange={(event) =>
                        setSelectedPersonnel(event.target.value)
                      } // Update state on change
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
                      onChange={(event) =>
                        setSelectedStatus(event.target.value)
                      } // Update state on change
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
                <TableCell colSpan={2}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleTicketRemoval(ticket.id)}
                    >
                      Delete Ticket
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleUpdate(ticket.id, {
                          id: ticket.id,
                          projectId: projects.find(
                            (project) => project.name === selectedProject
                          )!.id,
                          companyId: ticket.companyId,
                          title: titleValue,
                          description: descriptionValue,
                          submitterId: ticket.submitterId,
                          personnelId: users.find(
                            (user) => user.name === selectedPersonnel
                          )!.id,
                          priority: selectedPriority,
                          status: selectedStatus,
                          type: selectedType,
                          createdAt: ticket.createdAt,
                          comments: ticket.comments,
                        })
                      }
                    >
                      Update Ticket
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Modal>
    </>
  );
};

export default EditTicketController;
