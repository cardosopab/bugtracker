import Comment from "./Comment";
// Define the Story model using an interface
interface Story {
  _id: string;
  projectId: string;
  message: string;
  createdAt: number;
  comments: Comment[];
}

export default Story;
