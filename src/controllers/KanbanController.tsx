import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography } from "@mui/material";
import { statusOptions } from "../constants/ticketConstants"
import DrawerController from "./DrawerController"
import { useSelector } from "react-redux";
import { RootState } from "../models/redux/store";
import Ticket from "../models/Ticket";
import { useState } from "react";
import EditTicketController from "./EditTicketController";

const KanbanController = () => {
    const tickets = useSelector((state: RootState) => state.tickets.value);
    const [openTickets, setOpenTickets] = useState<Array<boolean>>([]);
    const ticketsByStatus: any = {};
    tickets.forEach((ticket: Ticket) => {
        if (!ticketsByStatus[ticket.status]) {
            ticketsByStatus[ticket.status] = [];
        }
        ticketsByStatus[ticket.status].push(ticket);
    });
    const handleModal = (index: number) => {
        const updatedOpenTickets = [...openTickets];
        updatedOpenTickets[index] = !updatedOpenTickets[index];
        setOpenTickets(updatedOpenTickets);
    };
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
                    <Typography variant="h4">Kanban Board</Typography>
                </Grid>

                {/* Kanban Board */}
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {statusOptions.map(status => <TableCell key={status}>{status}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {statusOptions.map((status: string, index: number) => (
                                        <TableCell sx={{ borderRight: '1px solid #ccc', }} key={`cell-${status}-${index}`}>
                                            {ticketsByStatus[status]?.map((ticket: Ticket, index: number) => {

                                                const isModalOpen = openTickets[index] ?? false;
                                                return (
                                                    <div key={`ticket-${ticket.id}-${index}`}>
                                                        <Modal
                                                            key={`modal-${ticket.id}-${index}`}
                                                            open={isModalOpen}
                                                            onClose={() => handleModal(index)}
                                                            aria-labelledby="modal-modal-title"
                                                            aria-describedby="modal-modal-description"
                                                        >
                                                            <Box sx={style}>
                                                                <EditTicketController key={`edit-${ticket.id}-${index}`} ticket={ticket} handleModal={handleModal} index={index} />
                                                            </Box>
                                                        </Modal>
                                                        <Button key={`button-${ticket.id}-${index}`} onClick={() => handleModal(index)}>{ticket.title}</Button>
                                                    </div>
                                                )
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
        </DrawerController>
    )
}

export default KanbanController;
