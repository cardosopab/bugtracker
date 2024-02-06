// Define the Company model using an interface
interface Company {
  _id: string;
  name: string;
  createdAt: Date;
  personnel: string[];
}

export default Company;
