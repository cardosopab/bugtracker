import Comment from "./Comment";
// Define the Ticket model using an interface
interface Ticket {
    id: string;
    projectId: string;
    message: string;
    createdAt: number;
    comments: Comment[];
}

export default Ticket;