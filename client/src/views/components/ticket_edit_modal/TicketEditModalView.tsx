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
import User from "../../../models/User";
import Project from "../../../models/Project";
import Ticket from "../../../models/Ticket";
import {
  priorityOptions,
  statusOptions,
  typeOptions,
} from "../../../constants/ticketConstants";

interface TicketEditModalViewProps {
  users: User[];
  projects: Project[];
  ticket: Ticket;
  title?: string;
  titleValue: string;
  isModalOpen: boolean;
  descriptionValue: string;
  selectedPersonnel: string;
  selectedPriority: string;
  selectedProject: string;
  selectedStatus: string;
  selectedType: string;
  setTitleValue: React.Dispatch<React.SetStateAction<string>>;
  setDescriptionValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPersonnel: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPriority: React.Dispatch<React.SetStateAction<string>>;
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: (ticket: Ticket) => void;
  handleTicketRemoval: (ticketId: string) => void;
  handleModalToggle: () => void;
}

const TicketEditModalView = ({
  users,
  projects,
  title,
  isModalOpen,
  ticket,
  titleValue,
  descriptionValue,
  selectedPersonnel,
  selectedPriority,
  selectedProject,
  selectedStatus,
  selectedType,
  setTitleValue,
  setDescriptionValue,
  setSelectedPersonnel,
  setSelectedProject,
  setSelectedPriority,
  setSelectedStatus,
  setSelectedType,
  handleUpdate,
  handleModalToggle,
  handleTicketRemoval,
}: TicketEditModalViewProps) => {
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
        <Card className="center" style={{ minWidth: 300 }}>
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
                      value={selectedProject}
                      onChange={(event) =>
                        setSelectedProject(event.target.value)
                      }
                    >
                      {projects.map((project) => (
                        <MenuItem key={project._id} value={project.name}>
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth={true} margin={"normal"}>
                    <InputLabel id="priority-dropdown-label">
                      Priority
                    </InputLabel>
                    <Select
                      labelId="priority-dropdown-label"
                      label="Priority"
                      id="priority-dropdown"
                      value={selectedPriority}
                      onChange={(event) =>
                        setSelectedPriority(event.target.value)
                      }
                    >
                      {priorityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth={true} margin={"normal"}>
                    <InputLabel id="type-dropdown-label">Type</InputLabel>
                    <Select
                      labelId="type-dropdown-label"
                      label="Type"
                      id="type-dropdown"
                      value={selectedType}
                      onChange={(event) => setSelectedType(event.target.value)}
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
                      value={selectedPersonnel}
                      onChange={(event) =>
                        setSelectedPersonnel(event.target.value)
                      }
                    >
                      {users.map((user) => (
                        <MenuItem key={user._id} value={user.name}>
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
                      value={selectedStatus}
                      onChange={(event) =>
                        setSelectedStatus(event.target.value)
                      }
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
                      onClick={() => handleTicketRemoval(ticket._id)}
                    >
                      Delete Ticket
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleUpdate({
                          _id: ticket._id,
                          projectId: projects.find(
                            (project) => project.name === selectedProject
                          )!._id,
                          companyId: ticket.companyId,
                          title: titleValue,
                          description: descriptionValue,
                          submitterId: ticket.submitterId,
                          personnelId: users.find(
                            (user) => user.name === selectedPersonnel
                          )!._id,
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
export default TicketEditModalView;
