import { useState } from "react";
import User from "../../models/User";
import { useUserActions } from "../../models/database/hooks/useUserActions";
import UserEditModalView from "../../views/components/user_edit_modal/UserEditModalView";

interface EditUserProps {
  user: User;
  buttonLabel?: string;
}

const UserEditModalController = ({ user, buttonLabel }: EditUserProps) => {
  const { deleteUser, updateUser } = useUserActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [isAdmin, setIsAdmin] = useState(user.role == "Admin");

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
    setNameInput(user.name);
    setIsAdmin(user.role == "Admin");
  };

  const handleUserRemoval = () => {
    deleteUser(user._id);
  };

  const handleNameInputChange = (event: any) => {
    setNameInput(event.target.value);
  };

  const handleUserUpdate = () => {
    // TODO: update view to select other values
    const newUser: User = {
      _id: user._id,
      name: nameInput,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      createdAt: user.createdAt,
    };
    updateUser(newUser);
    handleModalToggle();
  };

  const handleIsAdminDropdown = (event: any) => {
    const eventValue = event.target.value as string;
    const eventIsAdmin = eventValue === "YES";
    setIsAdmin(eventIsAdmin);
  };

  return (
    <UserEditModalView
      user={user}
      buttonLabel={buttonLabel}
      nameInput={nameInput}
      selectedIsAdmin={isAdmin ? "YES" : "NO"}
      isModalOpen={isModalOpen}
      handleNameInputChange={handleNameInputChange}
      handleIsAdminDropdown={handleIsAdminDropdown}
      handleModalToggle={handleModalToggle}
      handleUserUpdate={handleUserUpdate}
      handleUserRemoval={handleUserRemoval}
    />
  );
};

export default UserEditModalController;
