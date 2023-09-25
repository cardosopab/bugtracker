import { useState } from "react";
import Project from "../../models/Project";
import { useProjectActions } from "../../models/database/hooks/useProjectActions";
import ProjectDeleteModalView from "../../views/components/project_delete_modal/ProjectDeleteModalView";

interface ConfirmDeleteProps {
  project: Project;
  isPrimary?: boolean;
}

const ProjectDeleteModalController = ({
  project,
  isPrimary,
}: ConfirmDeleteProps) => {
  const deleteProject = useProjectActions().deleteProject;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleProjectDelete = (projectId: string) => {
    deleteProject(projectId);
  };

  return (
    <ProjectDeleteModalView
      project={project}
      isPrimary={isPrimary}
      isModalOpen={isModalOpen}
      handleModalToggle={handleModalToggle}
      handleProjectDelete={handleProjectDelete}
    />
  );
};
export default ProjectDeleteModalController;
