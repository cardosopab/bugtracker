import { Button, Card, CardHeader, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DrawerComponent from "../DrawerComponent"
import User from "../../models/User";
import { RegisterOptions } from "react-hook-form";

interface UsersViewProps {
  handleSubmit: any;
  onSubmit: any;
  register: (name: string, options?: RegisterOptions) => any;
  users: User[];
  errors: any;
}

function UsersView(props: UsersViewProps) {
  const { users, handleSubmit, onSubmit, register, errors } = props;
  return (
    <>
      <DrawerComponent />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" {...register('name', { required: "Required" })} />
        {errors.name && <p>{errors.name.message}</p>}
        <Input type="text" {...register('email', { required: "Required" })} />
        {errors.description && <p>{errors.description.message}</p>}
        <Button variant={'contained'} type="submit" >Create User</Button>
      </form>
      <Card style={{ margin: '1em' }}>
        <CardHeader title='Users' subheader='Users in your database' style={{ backgroundColor: '#1976d2', color: 'white', }} subheaderTypographyProps={{ color: 'white' }} />
        {users.length !== 0 ?
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
          <p>No Users found</p>}
      </Card>
    </>
  )
}
export default UsersView;