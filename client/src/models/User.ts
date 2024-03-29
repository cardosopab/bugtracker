// Define the User model using an interface
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  companyId: string;
  createdAt: Date;
}

export default User;
