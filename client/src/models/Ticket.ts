import Comment from "./Comment";
// Define the Ticket model using an interface
interface Ticket {
  id: string;
  title: string;
  description: string;
  projectId: string;
  companyId: string;
  submitterId: string;
  personnelId: string;
  priority: string;
  status: string;
  type: string;
  createdAt: number;
  comments: Comment[];
}

export default Ticket;
