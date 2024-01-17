// Define the Company model using an interface
interface Company {
  id: string;
  name: string;
  createdAt: number;
  personnel: string[];
}

export default Company;
