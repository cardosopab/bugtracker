// Define the Comment model using an interface
interface Comment {
    id: string;
    parentId: string;
    message: string;
    createdAt: number;
}

export default Comment;