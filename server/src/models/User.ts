// Define the User model using an interface
interface User {
  id: string;
  createdAt: number;
  name: string;
  email: string;
  role: string;
  companyId: string;
}

export default User;
