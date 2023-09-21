import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  CardHeader,
  Card,
} from "@mui/material";
import { statusOptions } from "../constants/ticketConstants";
import DrawerController from "./DrawerController";
import { useSelector } from "react-redux";
import { RootState } from "../models/redux/store";
import Ticket from "../models/Ticket";
import { useState } from "react";
import EditTicketController from "./EditTicketController";
import CreateTicketController from "./CreateTicketController";

const KanbanController = () => {
  const tickets = useSelector((state: RootState) => state.tickets.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const [openTickets, setOpenTickets] = useState<{ [id: string]: boolean }>({});

  const [openCreateModal, setCreateModal] = useState(false);
  const ticketsByStatus: any = {};
  tickets.forEach((ticket: Ticket) => {
    if (!ticketsByStatus[ticket.status]) {
      ticketsByStatus[ticket.status] = [];
    }
    ticketsByStatus[ticket.status].push(ticket);
  });
  const handleTicketModalToggle = (ticketId: string) => {
    setOpenTickets((prevOpenTickets) => ({
      ...prevOpenTickets,
      [ticketId]: !prevOpenTickets[ticketId],
    }));
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.paper",
    border: "3px solid #1976d2",
    borderRadius: "1em",
    boxShadow: 24,
    p: 4,
  };
  const handleCreateModalToggle = () => {
    setCreateModal((prev) => !prev);
  };
  return (
    <DrawerController>
      {projects.length > 0 ? (
        <Grid container spacing={2} padding={2}>
          {/* Title/Header */}
          <Grid item xs={12}>
            <h1>Kanban Board</h1>
          </Grid>

          {/* Kanban Board */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <CardHeader
                title="Project"
                subheader="Kanban board:"
                action={
                  <div>
                    <Button
                      onClick={() => handleCreateModalToggle()}
                      sx={{ color: "white" }}
                    >
                      Create a Ticket
                    </Button>
                    <Modal
                      open={openCreateModal}
                      onClose={() => handleCreateModalToggle()}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <CreateTicketController
                          handleModal={handleCreateModalToggle}
                          project={null}
                        />
                      </Box>
                    </Modal>
                  </div>
                }
              />
              <Table style={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    {statusOptions.map((status) => (
                      <TableCell
                        key={status}
                        style={{
                          border: "1px solid #ccc",
                        }}
                      >
                        {status}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {statusOptions.map(
                      (status: string, columnIndex: number) => (
                        <TableCell
                          key={`cell-${status}-${columnIndex}`}
                          style={{
                            border: "1px solid #ccc",
                            verticalAlign: "top",
                          }}
                        >
                          {ticketsByStatus[status]?.map((ticket: Ticket) => {
                            const isModalOpen = openTickets[ticket.id] ?? false;
                            return (
                              <div key={`ticket-${ticket.id}`}>
                                <Modal
                                  key={`modal-${ticket.id}`}
                                  open={isModalOpen}
                                  onClose={() =>
                                    handleTicketModalToggle(ticket.id)
                                  }
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <EditTicketController
                                      key={`edit-${ticket.id}`}
                                      ticket={ticket}
                                      handleModal={handleTicketModalToggle}
                                    />
                                  </Box>
                                </Modal>
                                <Button
                                  key={`button-${ticket.id}`}
                                  onClick={() =>
                                    handleTicketModalToggle(ticket.id)
                                  }
                                >
                                  {ticket.title}
                                </Button>
                              </div>
                            );
                          })}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <Card className="center">
          <CardHeader title="No Projects have been created yet!" />
        </Card>
      )}
    </DrawerController>
  );
};

export default KanbanController;
