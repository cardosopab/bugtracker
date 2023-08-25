import { Button, Card, CardHeader, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Project from "../../models/Project";
import Ticket from "../../models/Ticket";
import User from "../../models/User";
import { RegisterOptions } from "react-hook-form";

interface DetailsProps {
    details: Project;
    users: User[];
    tickets: Ticket[];
    register: (name: string, options?: RegisterOptions) => any;
    handleSubmit: any;
    handleTickeRemoval: any;
    onSubmit: any;
    errors: any;
}
const ProjectDetailsView = (props: DetailsProps) => {
    const { details, users, tickets, register, handleSubmit, handleTickeRemoval, onSubmit, errors } = props;
    const name = details.name;
    // const id = details.id;
    // const description = details.description;
    // const createdAt = details.createdAt;
    const personnel = details.personnel;
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input placeholder="Ticket Title" type="text" {...register('title', { required: "Required" })} />
                                {errors.title && <p>{errors.title.message}</p>}
                                {/* <Input placeholder="Description" type="text" {...register('description', { required: "Required" })} style={{ margin: '0 1em' }} /> */}
                                {/* {errors.description && <p>{errors.description.message}</p>} */}
                                <Button variant={'contained'} type="submit">Create Ticket</Button>
                            </form>
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
                                            // const project = projects.find(project => project.id === projectId);
                                            return (
                                                <TableRow key={id}>
                                                    <TableCell>{title}</TableCell>
                                                    <TableCell>{submitter?.name}</TableCell>
                                                    <TableCell>{personnel?.name}</TableCell>
                                                    <TableCell>{status}</TableCell>
                                                    <TableCell>{createdAt}</TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => handleTickeRemoval(id)} />
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
