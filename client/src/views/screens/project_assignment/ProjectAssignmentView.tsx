import {
  Button,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import User from "../../../models/User";
import Project from "../../../models/Project";

interface UsersViewProps {
  users: User[];
  projects: Project[];
  selectedUserName: string;
  selectedProjectName: string;
  handleProjectDropdown: any;
  handleUserDropdown: any;
  handleAddUser: any;
  handleRemoveUser: any;
  isRemoveButtonDisabled: boolean;
}

const ProjectAssigmentView = ({
  users,
  projects,
  selectedUserName,
  selectedProjectName,
  handleUserDropdown,
  handleProjectDropdown,
  handleAddUser,
  handleRemoveUser,
  isRemoveButtonDisabled,
}: UsersViewProps) => {
  return (
    <>
      {projects.length > 0 ? (
        <Grid container spacing={2} padding={2}>
          {/* Title/Header */}
          <Grid item xs={12}>
            <h1>Personnel Assignment</h1>
          </Grid>

          {/* First Column */}
          <Grid item xs={12} sm={4}>
            <FormControl margin={"normal"} fullWidth>
              <InputLabel id="user-dropdown-label">Select a User</InputLabel>
              <Select
                labelId="user-dropdown-label"
                value={selectedUserName}
                name={selectedUserName}
                label="Select a User"
                onChange={handleUserDropdown}
              >
                {users.map((option) => (
                  <MenuItem key={option._id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <FormControl margin={"normal"} fullWidth>
              <InputLabel id="project-dropdown-label">
                Select a Project
              </InputLabel>
              <Select
                labelId="project-dropdown-label"
                value={selectedProjectName}
                name={selectedProjectName}
                label="Select a Project"
                onChange={handleProjectDropdown}
              >
                {projects.map((option) => (
                  <MenuItem key={option._id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleAddUser}
              variant="contained"
              disabled={!isRemoveButtonDisabled}
              fullWidth
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              Add Personnel
            </Button>
            <Button
              onClick={handleRemoveUser}
              variant="contained"
              color="error"
              disabled={isRemoveButtonDisabled}
              fullWidth
            >
              Remove Personnel
            </Button>
          </Grid>

          {/* Second Column */}
          <Grid item xs={12} sm={8}>
            <Card>
              <CardHeader title="Projects" subheader="You are a part of:" />
              <TableContainer component={Paper}>
                <Table style={{ tableLayout: "fixed" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Project Name</TableCell>
                      <TableCell>Personnel</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map(({ _id, name, personnel }) => (
                      <TableRow key={_id}>
                        <TableCell>{name}</TableCell>
                        <TableCell>
                          <div className="column">
                            <List>
                              {personnel.map((id) => {
                                const user = users.find(
                                  (user) => user._id === id
                                );
                                return (
                                  <ListItem key={id}>
                                    <ListItemText primary={user?.name ?? ""} />
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
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Card className="center">
          <CardHeader title="No Projects have been created yet!" />
        </Card>
      )}
    </>
  );
};

export default ProjectAssigmentView;
