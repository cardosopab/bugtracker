import { useSelector } from "react-redux";
import UsersView from "../../views/screens/users/UsersView";
import { RootState } from "../../models/redux/store";
import { useEffect, useState } from "react";
import Project from "../../models/Project";
import { useProjectActions } from "../../models/database/hooks/useProjectActions";

const UsersController = () => {
  const { addUserToProject,  deleteUserFromProject } =
    useProjectActions();
  const users = useSelector((state: RootState) => state.users.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const [selectedProjectName, setSelectedProjectName] = useState<string>(
    projects.length > 0 ? projects[0].name : ""
  );
  const [selectedProjectObj, setSelectedProjectObject] = useState<Project>(
    projects.length > 0 ? projects[0] : ({} as Project)
  );
  const [selectedUserName, setSelectedUserName] = useState<string>(
    users.length > 0 ? users[0].name : ""
  );
  const [selectedUserId, setSelectedUserId] = useState<string>(
    users.length > 0 ? users[0]._id : ""
  );
  const [isRemoveButtonDisabled, setIsRemoveButtonDisabled] = useState(true);

  const checkButtonDisableStatus = () => {
    if (!selectedProjectObj._id) {
      setIsRemoveButtonDisabled(true);
      return;
    }

    const isUserInPersonnelArray =
      selectedProjectObj.personnel.includes(selectedUserId);
    setIsRemoveButtonDisabled(!isUserInPersonnelArray);
  };

  const handleUserDropdown = (event: React.ChangeEvent<{ value: unknown }>) => {
    const eventUserName = event.target.value as string;
    const eventUserObj = users.find((user) => user.name === eventUserName);
    if (eventUserObj) {
      setSelectedUserName(eventUserObj.name);
      setSelectedUserId(eventUserObj._id);
    }
  };
  const handleProjectDropdown = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const eventProjectName = event.target.value as string;
    const eventProjectObj = projects.find(
      (project) => project.name === eventProjectName
    );

    if (eventProjectObj) {
      setSelectedProjectName(eventProjectObj.name);
      setSelectedProjectObject(eventProjectObj);
    }
  };

  const handleAddUser = () => {
    addUserToProject(selectedUserId, selectedProjectObj._id);
    setIsRemoveButtonDisabled(!isRemoveButtonDisabled);
  };

  const handleRemoveUser = () => {
    deleteUserFromProject(selectedUserId, selectedProjectObj._id);
    setIsRemoveButtonDisabled(!isRemoveButtonDisabled);
  };

  useEffect(() => {
    checkButtonDisableStatus();
  }, [selectedUserId, selectedProjectName]);

  return (
    <>
      <UsersView
        users={users}
        projects={projects}
        selectedUserName={selectedUserName}
        handleUserDropdown={handleUserDropdown}
        selectedProjectName={selectedProjectName}
        handleProjectDropdown={handleProjectDropdown}
        handleAddUser={handleAddUser}
        handleRemoveUser={handleRemoveUser}
        isRemoveButtonDisabled={isRemoveButtonDisabled}
      />
    </>
  );
};
export default UsersController;
