import { Box, Button, CardHeader, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from "@mui/material";
import DrawerController from "../../controllers/DrawerController";
import Ticket from "../../models/Ticket";
import User from "../../models/User";
import Project from "../../models/Project";
import EditTicketController from "../../controllers/EditTicketController";

interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  projects: Project[];
  handleModal: any;
  openTickets: boolean[];
}

function Tickets(props: TicketsProps) {
  const { tickets, users, projects, handleModal, openTickets } = props;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '3px solid #1976d2',
    borderRadius: '1em',
    boxShadow: 24,
    p: 4,
  };

  return (
    <DrawerController>
      <Grid container spacing={2} padding={2}>
        {/* Title/Header */}
        <Grid item xs={12}>
          <h1>My Tickets</h1>
        </Grid>

        {/* Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <CardHeader title="Tickets" subheader="You are a part of:" />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>Title</TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Submitter</TableCell>
                  <TableCell>Developer</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket, index) => {

                  const isModalOpen = openTickets[index] ?? false;
                  const { id, title, projectId, submitterId, personnelId, priority, status, type, createdAt } = ticket;
                  const submitter = users.find(user => user.id === submitterId);
                  const personnel = users.find(user => user.id === personnelId);
                  const project = projects.find(project => project.id === projectId);

                  return (
                    <TableRow key={id}>
                      <TableCell colSpan={2}>{title}</TableCell>
                      <TableCell>{project?.name}</TableCell>
                      <TableCell>{submitter?.name}</TableCell>
                      <TableCell>{personnel?.name}</TableCell>
                      <TableCell>{priority}</TableCell>
                      <TableCell>{status}</TableCell>
                      <TableCell>{type}</TableCell>
                      <TableCell>{createdAt}</TableCell>
                      <TableCell>
                        <div className="column">
                          <Button onClick={() => handleModal(index)}>Edit</Button>
                          <Modal
                            open={isModalOpen}
                            onClose={() => handleModal(index)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <EditTicketController ticket={ticket} handleModal={handleModal} index={index} />
                            </Box>
                          </Modal>
                          <Button>Details</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </DrawerController>
  );
}

export default Tickets;

