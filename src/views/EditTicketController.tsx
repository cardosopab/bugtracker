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
    TableHead,
    TableRow,
  } from "@mui/material";
  import { useSelector } from "react-redux";
  import { RootState } from "../models/redux/store";
  
  const EditTicketController = () => {
    const projects = useSelector((state: RootState) => state.projects.value);
    const users = useSelector((state: RootState) => state.users.value);
  
    return (
      <Card>
        <CardHeader title="Edit Ticket" />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel htmlFor="title-input">Title</InputLabel>
                  <Input id="title-input" />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="project-dropdown-label">Project</InputLabel>
                  <Select
                    labelId="project-dropdown-label"
                    id="project-dropdown"
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.name}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="priority-dropdown-label">
                    Ticket Priority
                  </InputLabel>
                  <Select
                    labelId="priority-dropdown-label"
                    id="priority-dropdown"
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="type-dropdown-label">Ticket Type</InputLabel>
                  <Select labelId="type-dropdown-label" id="type-dropdown">
                    <MenuItem value="Bug/Errors">Bug/Errors</MenuItem>
                    <MenuItem value="Feature">Feature</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel htmlFor="description-input">Description</InputLabel>
                  <Input id="description-input" multiline rows={4} />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="developer-dropdown-label">
                    Assigned Developer
                  </InputLabel>
                  <Select
                    labelId="developer-dropdown-label"
                    id="developer-dropdown"
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="status-dropdown-label">Ticket Status</InputLabel>
                  <Select labelId="status-dropdown-label" id="status-dropdown">
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
  