import Project from "../../Project";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { ProjectsEndpoints } from "../../../constants/apiEndpoints";
import { setPaginatedProjects, setProjects } from "../../redux/projectsSlice";
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

  const addUserByEmailToProject = async (email: string, projectId: string) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const res = await axios.post(ProjectsEndpoints.PROJECT_BY_EMAIL, {
        email: email,
        projectId: projectId,
      });
      // dispatch(setProjects(res.data));
      return res.data;
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

  const readCompanyProjects = async (companyId: string) => {
    try {
      const res = await axios.post(ProjectsEndpoints.PROJECTS_BY_COMPANY, {
        companyId: companyId,
      });
      dispatch(setProjects(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const readPaginatedProjects = async (page: number, companyId: string) => {
    const pageSize = 6;
    try {
      const res = await axios.post(ProjectsEndpoints.PROJECTS_BY_PAGE, {
        page: page,
        pageSize: pageSize,
        companyId: companyId,
      });
      dispatch(
        setPaginatedProjects({
          paginatedProjects: res.data.projects as Project[],
          page: res.data.page as number,
          totalPages: res.data.totalPages as number,
        })
      );
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
    addUserByEmailToProject,
    addUserToProject,
    readProjects,
    readCompanyProjects,
    readPaginatedProjects,
    updateProject,
    deleteProject,
    deleteUserFromProject,
  };
};
