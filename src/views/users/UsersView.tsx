import { Button, Card, CardHeader, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DrawerController from "../../controllers/DrawerController"
import User from "../../models/User";
import Project from "../../models/Project";

interface UsersViewProps {
  users: User[];
  projects: Project[];
  selectedUser: User;
  selectedProject: Project;
  handleProjectDropdown: any;
  handleUserDropdown: any;
  handleAddUser: any;
  handleRemoveUser: any;
  isRemoveButtonDisabled: boolean;
}

function UsersView(props: UsersViewProps) {
  const { users, projects, selectedUser, selectedProject, handleUserDropdown, handleProjectDropdown, handleAddUser, handleRemoveUser, isRemoveButtonDisabled } = props;
  return (
    <>
      <DrawerController>
        <div className="row">
          <FormControl>
            <InputLabel id="dropdown-label">Select an option</InputLabel>
            <Select
              labelId="dropdown-label"
              value={selectedUser.name}
              name={selectedUser.name}
              label="Select an option"
              onChange={handleUserDropdown}
            >
              {users.map(option => (
                <MenuItem key={option.id} value={option.name} >
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="dropdown-label">Select an option</InputLabel>
            <Select
              labelId="dropdown-label"
              value={selectedProject.name}
              name={selectedProject.name}
              label="Select an option"
              onChange={handleProjectDropdown}
            >
              {projects.map(option => (
                <MenuItem key={option.id} value={option.name} >
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button onClick={handleAddUser} variant="contained" disabled={!isRemoveButtonDisabled}>Add Personnel</Button>
          <Button onClick={handleRemoveUser} variant="contained" color="error" disabled={isRemoveButtonDisabled}>Remove Personnel</Button>
        </div>
        <Card style={{ margin: '1em' }}>
          <CardHeader title='Projects' subheader='You are a part of:' style={{ backgroundColor: '#1976d2', color: 'white', }} subheaderTypographyProps={{ color: 'white' }} />
          {
            projects.length !== 0 ?
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project Name</TableCell>
                      <TableCell>Personnel</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map(({ id, name, personnel }) => (
                      <TableRow key={id}>
                        <TableCell>{name}</TableCell>
                        <TableCell>
                          <div className="column">
                            <List>
                              {personnel.map(id => {

                                const user = users.find(user => user.id === id);
                                return (
                                  <ListItem key={id}>
                                    <ListItemText primary={user?.name ?? ''} />
                                  </ListItem>
                                );
                              })}
                            </List>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              :
              <p>No Projects found</p>
          }
        </Card>
      </DrawerController>
    </>
  )
}
export default UsersView;