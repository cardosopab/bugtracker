import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "../models/redux/store";
import Project from "../models/Project";
import ProjectsView from "../views/projects/ProjectsView";
import { useNavigate } from "react-router-dom";
import { setDrawerIndex } from "../models/redux/drawerSlice";
import { setProjectDetails } from "../models/redux/projectDetailsSlice";
import { PROJECT_DETAILS_URL } from "../constants/viewsUrls";
import { useProjectActions } from "../models/database/hooks/useProjectActions";

function ProjectsController() {
  const createProject = useProjectActions().createProject;
  const navigateTo = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.value);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const onSubmit = (values: any) => {
    createProject(values.name, values.description, currentUser.companyId);
    reset();
  };

  function navigateToDetails(details: Project) {
    navigateTo(PROJECT_DETAILS_URL);
    dispatch(setDrawerIndex(90));
    dispatch(setProjectDetails(details));
  }
  return (
    <>
      <ProjectsView
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        projects={projects}
        errors={errors}
        navigateToDetails={navigateToDetails}
      />
    </>
  );
}
export default ProjectsController;
