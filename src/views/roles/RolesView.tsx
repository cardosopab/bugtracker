import DrawerComponent from "../DrawerComponent"
import UserDropdown from "./UserDropdown"
import RoleDropdown from "./RoleDropdown";
import { Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
            <DrawerComponent />
            <div className="row">
                <div className="column" style={{ maxHeight: '50vh' }}>
                    <UserDropdown users={users} selectedValue={selectedUserName} onChange={handleUserDropdown} />
                    <RoleDropdown roles={roles} selectedValue={selectedRole} onChange={handleRoleDropdown} />
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
        </>
    )
}
export default RolesView