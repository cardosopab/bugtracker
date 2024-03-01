import { useState } from "react";
import User from "../../models/User";
import { useUserActions } from "../../models/database/hooks/useUserActions";
import UserEditModalView from "../../views/components/user_edit_modal/UserEditModalView";
import { useForm } from "react-hook-form";

interface EditUserProps {
  user: User;
  buttonLabel?: string;
}

const UserEditModalController = ({ user, buttonLabel }: EditUserProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const { deleteUser, updateUser } = useUserActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role);

  const onSubmit = (values: any) => {
    const updatedUser: User = {
      _id: user._id,
      name: values.name,
      email: values.email,
      role: selectedRole,
      companyId: user.companyId,
      createdAt: user.createdAt,
    };
    updateUser(updatedUser);
    reset();
    setIsModalOpen((prev) => !prev);
  };

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
    reset();
  };

  const handleUserRemoval = () => {
    deleteUser(user._id);
  };

  const handleRoleDropdown = (event: any) => {
    setSelectedRole(event.target.value);
  };

  return (
    <UserEditModalView
      user={user}
      buttonLabel={buttonLabel}
      isModalOpen={isModalOpen}
      handleModalToggle={handleModalToggle}
      handleUserRemoval={handleUserRemoval}
      register={register}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      errors={errors}
      selectedRole={selectedRole}
      handleRoleDropdown={handleRoleDropdown}
    />
  );
};

export default UserEditModalController;
