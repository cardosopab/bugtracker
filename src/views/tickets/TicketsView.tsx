import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DrawerComponent from "../DrawerComponent"
import Ticket from "../../models/Ticket";

interface TicketsProps {
  tickets: Ticket[];
}
function Tickets(props: TicketsProps) {
  const { tickets } = props;
  return (
    <>
      <DrawerComponent />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Title</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Developer</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map(({ id, title, name, dev, priority, status, type, createdAt }) => (
              <TableRow key={id}>
                <TableCell colSpan={2}>{title}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{dev}</TableCell>
                <TableCell>{priority}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{createdAt}</TableCell>
                <TableCell>
                  <div className="column">
                    <Button>Edit</Button>
                    <Button>Details</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default Tickets