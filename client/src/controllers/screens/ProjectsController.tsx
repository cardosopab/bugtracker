import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "../../models/redux/store";
import Project from "../../models/Project";
import ProjectsView from "../../views/screens/projects/ProjectsView";
import { useNavigate } from "react-router-dom";
import { setProjectDetails } from "../../models/redux/projectDetailsSlice";
import { PROJECT_DETAILS_URL } from "../../constants/viewEndpoints";
import { useProjectActions } from "../../models/database/hooks/useProjectActions";
import { useEffect } from "react";

const ProjectsController = () => {
  const { createProject, readPaginatedProjects } = useProjectActions();
  const navigateTo = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.currentUser);
  const companyId = user!.companyId;
  const { paginatedProjects, page, totalPages } = useSelector(
    (state: RootState) => state.projects
  );

  const onSubmit = (values: any) => {
    createProject(values.name, values.description, companyId);
    reset();
  };

  const navigateToDetails = (details: Project) => {
    navigateTo(PROJECT_DETAILS_URL);
    dispatch(setProjectDetails(details));
  };

  const handlePageChange = async (page: number) => {
    await readPaginatedProjects(page, companyId);
  };

  useEffect(() => {
    readPaginatedProjects(page, companyId);
  }, []);

  return (
    <>
      <ProjectsView
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        paginatedProjects={paginatedProjects}
        errors={errors}
        navigateToDetails={navigateToDetails}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
export default ProjectsController;
