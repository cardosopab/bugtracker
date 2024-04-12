import { useProjectActions } from "../../models/database/hooks/useProjectActions";
import { useForm } from "react-hook-form";
import ProjectCreateModalView from "../../views/components/project_create_modal/ProjectCreateModalView";
import { useState } from "react";

const ProjectCreateModalController = ({
  isPrimary,
}: {
  isPrimary?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createProject } = useProjectActions();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (values: any) => {
    createProject(values.name, values.description);
    handleModalToggle();
  };
  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
    reset();
  };
  return (
    <ProjectCreateModalView
      isModalOpen={isModalOpen}
      handleModalToggle={handleModalToggle}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      isPrimary={isPrimary}
    />
  );
};
export default ProjectCreateModalController;
