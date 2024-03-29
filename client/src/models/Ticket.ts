import Comment from "./Comment";
// Define the Ticket model using an interface
interface Ticket {
  _id: string;
  title: string;
  description: string;
  projectId: string;
  companyId: string;
  submitterId: string;
  personnelId: string;
  priority: string;
  status: string;
  type: string;
  comments: Comment[];
  createdAt: Date;
}

export default Ticket;
