import { useForm } from "react-hook-form";
import { RootState } from "../models/redux/store";
import DrawerComponent from "../views/DrawerComponent"
import ProjectDetailsView from "../views/project_details/ProjectDetailsView"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { createTicket, removeTicket } from "../models/database/database";

const ProjectDetailsController = () => {
    const details = useSelector((state: RootState) => state.projectDetails.value);
    let tickets = useSelector((state: RootState) => state.tickets.value);
    const users = useSelector((state: RootState) => state.users.value);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = (values: any) => {
        console.log('onSubmit', values.title);
        createTicket(details.id, currentUser, values.title, 'low', 'on-going', 'bug');
        // values.name = ''
        // values.description = '';
    };
    const handleTicketRemoval = (ticketId: string) => {
        removeTicket(ticketId);

    }
    if (details.id === undefined) {
        return (
            <>
                <DrawerComponent />
                <div className='center'>No project was selected.</div>
            </>
        );
    }
    tickets = tickets.filter(ticket => ticket.projectId === details.id);
    return (
        <>
            <DrawerComponent />
            <ProjectDetailsView details={details} users={users} tickets={tickets} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} handleTickeRemoval={handleTicketRemoval} />
        </>
    )
}
export default ProjectDetailsController
