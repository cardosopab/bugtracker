import { useSelector } from "react-redux";
import UsersView from "../views/users/UsersView";
import { RootState } from "../models/redux/store";
import { useEffect, useState } from "react";
import User from "../models/User";
import Project from "../models/Project";
import { useProjectActions } from "../models/database/hooks/useProjectActions";

function UsersController() {
  const deleteUserFromProject = useProjectActions().deleteUserFromProject;
  const addUserToProject = useProjectActions().addUserToProject;
  const users = useSelector((state: RootState) => state.users.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const [selectedProject, setSelectedProject] = useState<Project>(
    projects.length > 0 ? projects[0] : ({} as Project)
  );
  const [selectedUser, setSelectedUser] = useState<User>(
    users.length > 0 ? users[0] : ({} as User)
  );
  const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(true);

  const findProjectAndUserAvailability = () => {
    if (!selectedUser.id || !selectedProject.id) {
      setIsRemoveButtonDisabled(true);
      return;
    }

    const isUserInPersonnelArray = selectedProject.personnel.includes(
      selectedUser.id
    );
    setIsRemoveButtonDisabled(!isUserInPersonnelArray);
  };
  const handleUserDropdown = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedUserName = event.target.value as string;
    const selectedUserObj = users.find(
      (user) => user.name === selectedUserName
    );
    if (selectedUserObj) {
      setSelectedUser(selectedUserObj);
    }
  };
  const handleProjectDropdown = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedProjectName = event.target.value as string;
    const selectedProjectObj = projects.find(
      (project) => project.name === selectedProjectName
    );

    if (selectedProjectObj) {
      setSelectedProject(selectedProjectObj);
    }
  };

  const handleAddUser = () => {
    console.log(selectedUser.id, selectedProject.id);
    addUserToProject(selectedUser.id, selectedProject.id);
    setIsRemoveButtonDisabled(!isRemoveButtonDisabled);
  };

  const handleRemoveUser = () => {
    console.log(selectedUser.id, selectedProject.id);
    deleteUserFromProject(selectedUser.id, selectedProject.id);
    setIsRemoveButtonDisabled(!isRemoveButtonDisabled);
  };

  useEffect(() => {
    findProjectAndUserAvailability();
  }, [selectedUser.id, selectedProject.id]);

  return (
    <>
      <UsersView
        users={users}
        projects={projects}
        selectedUser={selectedUser}
        handleUserDropdown={handleUserDropdown}
        selectedProject={selectedProject}
        handleProjectDropdown={handleProjectDropdown}
        handleAddUser={handleAddUser}
        handleRemoveUser={handleRemoveUser}
        isRemoveButtonDisabled={isRemoveButtonDisabled}
      />
    </>
  );
}
export default UsersController;
