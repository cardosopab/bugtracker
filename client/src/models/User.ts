// Define the User model using an interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId: string;
  createdAt: Date;
}

export default User;
