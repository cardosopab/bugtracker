import { RootState } from "../models/redux/store";
import DrawerController from "./DrawerController"
import ProjectDetailsView from "../views/project_details/ProjectDetailsView"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { removeTicket } from "../models/database/database";
import { useState } from "react";

const ProjectDetailsController = () => {
    const details = useSelector((state: RootState) => state.projectDetails.value);
    let tickets = useSelector((state: RootState) => state.tickets.value);
    const users = useSelector((state: RootState) => state.users.value);
    const [open, setOpen] = useState(false)
    const handleTicketRemoval = (ticketId: string) => {
        removeTicket(ticketId);

    }
    const handleModal = () => {
        setOpen(!open);
    }
    if (details.id === undefined) {
        return (
            <>
                <DrawerController >
                    <div className='center'>No project was selected.</div>
                </DrawerController>
            </>
        );
    }
    tickets = tickets.filter(ticket => ticket.projectId === details.id);
    return (
        <>
            <DrawerController>
                <ProjectDetailsView details={details} users={users} tickets={tickets} handleTicketRemoval={handleTicketRemoval} handleModal={handleModal} open={open} />
            </DrawerController>
        </>
    )
}
export default ProjectDetailsController
