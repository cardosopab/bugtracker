import { Box, Button, CardHeader, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
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
    // Group tasks by status
    const tasksByStatus: any = {};
    tickets.forEach((ticket: Ticket) => {
        if (!tasksByStatus[ticket.status]) {
            tasksByStatus[ticket.status] = [];
        }
        tasksByStatus[ticket.status].push(ticket);
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
        <>
            <DrawerController>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {statusOptions.map(status => <TableCell>{status}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                {statusOptions.map((status, index) => (
                                    <TableCell key={status}>
                                        {tasksByStatus[status]?.map((ticket: Ticket, index: number) => {

                                            const isModalOpen = openTickets[index] ?? false;
                                            return (
                                                <>
                                                    <Modal
                                                        open={isModalOpen}
                                                        onClose={() => handleModal(index)}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                    >
                                                        <Box sx={style}>
                                                            {/* <p>{title}</p> */}
                                                            <EditTicketController ticket={ticket} handleModal={handleModal} index={index} />
                                                        </Box>
                                                    </Modal>
                                                    <Button key={ticket.id} onClick={() => handleModal(index)}>{ticket.title}</Button>
                                                </>
                                            )
                                        })}
                                    </TableCell>
                                )
                                )}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </DrawerController>
        </>
    )
}
export default KanbanController