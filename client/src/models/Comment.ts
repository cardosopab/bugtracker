// Define the Comment model using an interface
interface Comment {
  _id: string;
  parentId: string;
  message: string;
  createdAt: number;
}

export default Comment;
