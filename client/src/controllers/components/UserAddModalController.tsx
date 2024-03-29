import { useState } from "react";
import User from "../../models/User";
import UserAddModalView from "../../views/components/user_add_modal/UserAddModalView";
import { useForm } from "react-hook-form";
import { useProjectActions } from "../../models/database/hooks/useProjectActions";

interface AddUserProps {
  buttonLabel?: string;
  projectId: string;
}

const UserAddModalController = ({ buttonLabel, projectId }: AddUserProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const { addUserByEmailToProject } = useProjectActions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (values: any) => {
    const updatedUser: User = {
      _id: "",
      name: values.name,
      email: values.email,
      role: "",
      companyId: "",
      createdAt: new Date(),
    };
    console.log(addUserByEmailToProject(updatedUser.email, projectId));
    reset();
    setIsModalOpen((prev) => !prev);
  };

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
    reset();
  };

  return (
    <UserAddModalView
      buttonLabel={buttonLabel}
      isModalOpen={isModalOpen}
      handleModalToggle={handleModalToggle}
      register={register}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default UserAddModalController;
