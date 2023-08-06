import User from "./User";
// Define the Project model using an interface
interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: number;
    personnel: User[];
}

export default Project;