// Define the Project model using an interface
interface Project {
  _id: string;
  companyId: string;
  name: string;
  description: string;
  createdAt: Date;
  personnel: string[];
}

export default Project;
