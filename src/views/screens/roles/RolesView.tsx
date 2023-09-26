import DrawerController from "../../../controllers/components/DrawerController";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
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
} from "@mui/material";
import User from "../../../models/User";

interface RolesViewProps {
  users: User[];
  selectedUserName: string;
  handleUserDropdown: any;
  roles: any;
  handleRoleDropdown: any;
  handleRoleSubmit: any;
  selectedRole: string;
}

function RolesView({
  users,
  selectedUserName,
  handleUserDropdown,
  roles,
  handleRoleDropdown,
  handleRoleSubmit,
  selectedRole,
}: RolesViewProps) {
  return (
    <DrawerController>
      <Grid container spacing={2} padding={2}>
        {/* Title/Header */}
        <Grid item xs={12}>
          <h1>Role Assignment</h1>
        </Grid>

        {/* First Column */}
        <Grid item xs={12} sm={4}>
          <div style={{ maxHeight: "50vh" }}>
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
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            <FormControl margin={"normal"} fullWidth>
              <InputLabel id="role-dropdown-label">Select a Role</InputLabel>
              <Select
                labelId="role-dropdown-label"
                value={selectedRole}
                name={selectedRole}
                label="Select a Role"
                onChange={handleRoleDropdown}
              >
                {roles.map((option: any) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleRoleSubmit}
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Set Role
            </Button>
          </div>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} sm={8}>
          <Card>
            <CardHeader title="Personnel" subheader="Within the database:" />
            {users.length !== 0 ? (
              <TableContainer component={Paper}>
                <Table style={{ tableLayout: "fixed" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>User Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(({ id, name, email, role }) => (
                      <TableRow key={id}>
                        <TableCell>{name}</TableCell>
                        <TableCell
                          style={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                          }}
                        >
                          {email}
                        </TableCell>
                        <TableCell>{role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <p>No Users Found</p>
            )}
          </Card>
        </Grid>
      </Grid>
    </DrawerController>
  );
}

export default RolesView;
