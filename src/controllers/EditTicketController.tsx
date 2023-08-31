import { Button, Card, CardHeader, FormControl, InputLabel, Input, MenuItem, Select, Table, TableBody, TableCell, TableRow, } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../models/redux/store";
import { useState } from "react";
import Ticket from "../models/Ticket";

interface EditTicketProps {
  ticket: Ticket
}
const EditTicketController = (props: EditTicketProps) => {
  const { ticket } = props
  const projects = useSelector((state: RootState) => state.projects.value);
  const users = useSelector((state: RootState) => state.users.value);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  return (
    <Card>
      <CardHeader title={`Edit Ticket: ${ticket.title}`}/>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{ width: '50%', verticalAlign: 'top' }}>
              <FormControl fullWidth={true} margin={"normal"}>
                <InputLabel htmlFor="title-input">Title</InputLabel>
                <Input id="title-input" />
              </FormControl>
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
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
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
                  <MenuItem value="Bug/Errors">Bug/Errors</MenuItem>
                  <MenuItem value="Feature">Feature</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <TableCell style={{ width: '50%', verticalAlign: 'top' }}>
              <FormControl fullWidth={true} margin={"normal"}>
                <InputLabel htmlFor="description-input">Description</InputLabel>
                <Input id="description-input" multiline rows={4} />
              </FormControl>
              <FormControl fullWidth={true} margin={"normal"}>
                <InputLabel id="developer-dropdown-label">
                  Developer
                </InputLabel>
                <Select
                  labelId="developer-dropdown-label"
                  label="Developer"
                  id="developer-dropdown"
                  value={selectedDeveloper} // Connect to state
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
                  <MenuItem value="Unassigned">Unassigned</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Needs Attention">Needs Attention</MenuItem>
                  <MenuItem value="Ready for Review">Ready for Review</MenuItem>
                  <MenuItem value="Finished">Finished</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align="center">
              <Button>Back to List</Button>
              <Button variant="contained" color="primary">
                Update Ticket
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default EditTicketController;
