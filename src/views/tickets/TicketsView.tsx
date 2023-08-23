import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import DrawerComponent from "../DrawerComponent"
import Ticket from "../../models/Ticket";
import User from "../../models/User";
import Project from "../../models/Project";

interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  projects: Project[];
}
function Tickets(props: TicketsProps) {
  const { tickets, users, projects } = props;
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
            {tickets.map(({ id, title, projectId, submitterId, personnelId, priority, status, type, createdAt }) => {
              const submitter = users.find(user => user.id === submitterId);
              const project = projects.find(project => project.id === projectId);
              return (
                <TableRow key={id}>
                  <TableCell colSpan={2}>{title}</TableCell>
                  <TableCell>{project?.name}</TableCell>
                  <TableCell>{submitter?.name}</TableCell>
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
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
export default Tickets
