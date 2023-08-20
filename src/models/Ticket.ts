import Comment from "./Comment";
// Define the Ticket model using an interface
interface Ticket {
    id: string;
    projectId: string;
    title: string;
    name: string;
    dev: string;
    priority: string;
    status: string;
    type: string;
    createdAt: number;
    comments: Comment[];
}

export default Ticket;