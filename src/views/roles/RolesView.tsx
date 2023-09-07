import DrawerController from "../../controllers/DrawerController"
import { Button, Card, CardHeader, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import User from "../../models/User";

interface RolesViewProps {
    users: User[];
    selectedUserName: string;
    handleUserDropdown: any;
    roles: any;
    handleRoleDropdown: any;
    handleRoleSubmit: any;
    selectedRole: string;

}
function RolesView(props: RolesViewProps) {
    const { users, selectedUserName, handleUserDropdown, roles, handleRoleDropdown, handleRoleSubmit, selectedRole, } = props;

    return (
        <>
            <DrawerController>
                <div className="row">
                    <div className="column" style={{ maxHeight: '50vh' }}>
                        <FormControl>
                            <InputLabel id="dropdown-label">Select an option</InputLabel>
                            <Select
                                labelId="dropdown-label"
                                value={selectedUserName}
                                name={selectedUserName}
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
                        <Divider />
                        <FormControl>
                            <InputLabel id="dropdown-label">Select an option</InputLabel>
                            <Select
                                labelId="dropdown-label"
                                value={selectedRole}
                                label="Select an option"
                                onChange={handleRoleDropdown}
                            >
                                {roles.map((option: any) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button onClick={handleRoleSubmit} variant="contained">Set Role</Button>
                    </div>
                    <div className="column">
                        <Card>
                            <CardHeader title='Personnel' />
                            {
                                users.length !== 0 ?
                                    <TableContainer component={Paper}>
                                        <Table>
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
                                                        <TableCell>{email}</TableCell>
                                                        <TableCell>{role}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    :
                                    <p>No Users Found</p>
                            }
                        </Card>
                    </div>
                </div >
            </DrawerController>
        </>
    )
}
export default RolesView