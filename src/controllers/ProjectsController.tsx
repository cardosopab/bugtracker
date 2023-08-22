import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "../models/redux/store";
import { createProject } from "../models/database/database";
import Project from "../models/Project";
import ProjectsView from "../views/projects/ProjectsView";
import { useNavigate } from "react-router-dom";
import { setDrawerIndex } from "../models/redux/drawerSlice";
import { setProjectDetails } from "../models/redux/projectDetailsSlice";
import { PROJECT_DETAILS_URL, USERS_URL } from "../views/viewsUrls";

function ProjectsController() {
    const navigateTo = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const projects = useSelector((state: RootState) => state.projects.value);

    const onSubmit = (values: any) => {
        console.log(values.name, values.description)
        createProject(values.name, values.description);
        values.name = ''
        values.description = '';
    };

    function navigateToUsers() {
        navigateTo(USERS_URL)
        dispatch(setDrawerIndex(2));
    }

    function navigateToDetails(details: Project) {
        navigateTo(PROJECT_DETAILS_URL)
        dispatch(setDrawerIndex(90));
        dispatch(setProjectDetails(details))
    }
    return (
        <>
            <ProjectsView handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} projects={projects} errors={errors} navigateToUsers={navigateToUsers} navigateToDetails={navigateToDetails} />
        </>
    )
}
export default ProjectsController