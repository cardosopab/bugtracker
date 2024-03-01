import Project from "../../Project";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { ProjectsEndpoints } from "../../../constants/apiEndpoints";
import { setProjects } from "../../redux/projectsSlice";
import { handleAxiosError } from "../../../utils/axiosErrorHandler";

export const useProjectActions = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const createProject = async (
    name: string,
    description: string,
    companyId: string
  ) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    const newProject: Project = {
      _id: "",
      name: name,
      description: description,
      companyId: companyId,
      createdAt: new Date(),
      personnel: [],
    };

    try {
      const res = await axios.post(ProjectsEndpoints.PROJECTS, newProject);
      dispatch(setProjects(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const addUserToProject = async (personnelId: string, projectId: string) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    console.log(personnelId, projectId);

    try {
      const res = await axios.post(ProjectsEndpoints.PERSONNEL, {
        personnelId: personnelId,
        projectId: projectId,
      });
      dispatch(setProjects(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const readProjects = async () => {
    try {
      const res = await axios.get(ProjectsEndpoints.PROJECTS);
      dispatch(setProjects(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const updateProject = async (project: Project) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    const projectWithProjectId = { ...project, projectId: project._id };

    try {
      const res = await axios.patch(
        ProjectsEndpoints.PROJECT_BY_ID,
        projectWithProjectId
      );
      dispatch(setProjects(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const res = await axios.delete(ProjectsEndpoints.PROJECT_BY_ID, {
        data: { projectId: projectId },
      });
      dispatch(setProjects(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const deleteUserFromProject = async (
    personnelId: string,
    projectId: string
  ) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const res = await axios.delete(ProjectsEndpoints.PERSONNEL, {
        data: { projectId: projectId, personnelId: personnelId },
      });
      dispatch(setProjects(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  return {
    createProject,
    addUserToProject,
    readProjects,
    updateProject,
    deleteProject,
    deleteUserFromProject,
  };
};
