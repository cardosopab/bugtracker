import { Box, Button, Card, CardHeader, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Project from "../../models/Project";
import Ticket from "../../models/Ticket";
import User from "../../models/User";
import { RegisterOptions } from "react-hook-form";

interface DetailsProps {
    details: Project;
    users: User[];
    tickets: Ticket[];
    handleTicketRemoval: any;
    handleModal: any;
    open: boolean;
}
const ProjectDetailsView = (props: DetailsProps) => {
    const { details, users, tickets, handleTicketRemoval, handleModal, open } = props;
    const name = details.name;
    // const id = details.id;
    // const description = details.description;
    // const createdAt = details.createdAt;

    const personnel = details.personnel;

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <Card>
                <CardHeader title={`Details for ${name}`} />
                <div className="row">
                    <div className="column">
                        <Card>
                            <CardHeader title={"Personnel"} />
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
                                        {personnel.map(id => {
                                            const user = users.find(user => user.id === id);
                                            return (
                                                <TableRow key={id}>
                                                    <TableCell>{user?.name}</TableCell>
                                                    <TableCell>{user?.email}</TableCell>
                                                    <TableCell>{user?.role}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </div>
                    <div className="column">
                        <div className="row">
                            {/* <form onSubmit={handleSubmit(onSubmit)}>
                                <Input placeholder="Ticket Title" type="text" {...register('title', { required: "Required" })} />
                                {errors.title && <p>{errors.title.message}</p>}
                                <Button variant={'contained'} type="submit">Create Ticket</Button>
                            </form> */}
                            <Button onClick={handleModal}>Open modal</Button>
                            <Modal
                                open={open}
                                onClose={handleModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Text in a modal
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>
                        <Card>
                            <CardHeader title={`Tickets for ${name}`} />
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Submitter</TableCell>
                                            <TableCell>Developer</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Created</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tickets.map(({ id, title, projectId, submitterId, personnelId, status, createdAt, }) => {
                                            const submitter = users.find(user => user.id === submitterId);
                                            const personnel = users.find(user => user.id === personnelId);
                                            return (
                                                <TableRow key={id}>
                                                    <TableCell>{title}</TableCell>
                                                    <TableCell>{submitter?.name}</TableCell>
                                                    <TableCell>{personnel?.name}</TableCell>
                                                    <TableCell>{status}</TableCell>
                                                    <TableCell>{new Date(createdAt).toLocaleString(undefined, {
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        year: "2-digit",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: true,
                                                    })}</TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => handleTicketRemoval(id)} >Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </div>
                </div>
            </Card>
        </>
    )
}
export default ProjectDetailsView
