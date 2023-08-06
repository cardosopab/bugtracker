import { Card, CardHeader, List, ListItem, ListItemText } from "@mui/material"
import DrawerComponent from "../DrawerComponent"
import User from "../../models/User";

interface UsersViewProps {
  users: User[];
}

function UsersView(props: UsersViewProps) {
  const { users } = props;
  return (
    <>
      <DrawerComponent />
      <Card style={{ margin: '1em' }}>
        <CardHeader title='Users' subheader='Users in your database' style={{ backgroundColor: '#1976d2', color: 'white', }} subheaderTypographyProps={{ color: 'white' }} />
        {users.length !== 0 ?
          <List>
            {users.map(({ name, email, role }) => (
              <ListItem key={name} disablePadding >
                <ListItemText primary={name + ': ' + email + ': ' + role} />
              </ListItem>
            ))}
          </List>
          :
          <p>No Users found</p>}
      </Card>
    </>
  )
}
export default UsersView;