import { useEffect } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { RootState } from "../models/redux/store";
import { createProject } from "../models/database/database";
import { database } from "../models/database/firebase-config";
import Project from "../models/Project";
import { setProjects } from "../models/redux/projectsSlice";
import ProjectsView from "../views/projects/ProjectsView";
import { PROJECTS } from "../models/database/databaseEndpoints";
import { useNavigate } from "react-router-dom";
import { setDrawerIndex } from "../models/redux/drawerSlice";
import { setDetails } from "../models/redux/detailsSlice";

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
        navigateTo('/users')
        dispatch(setDrawerIndex(2));
    }

    function navigateToDetails(details: Project) {
        navigateTo('/details')
        dispatch(setDrawerIndex(90));
        dispatch(setDetails(details))
    }
    // useEffect(() => {
    //     const unsubscribe =
    //         onSnapshot(
    //             query(collection(database, PROJECTS), orderBy("createdAt", "desc")),
    //             (querySnapshot) => {
    //                 const arr: Project[] = [];
    //                 querySnapshot.forEach((doc) => {
    //                     const data = doc.data();
    //                     console.log('data', data)
    //                     const project: Project = {
    //                         id: data.id,
    //                         name: data.name,
    //                         description: data.description,
    //                         createdAt: data.createdAt,
    //                         personnel: data.personnel,
    //                     };
    //                     arr.push(project)
    //                 });
    //                 batch(() => {
    //                     dispatch(setProjects(arr));
    //                 });
    //             });
    //     return () => unsubscribe();
    // }, [])
    return (
        <>
            <ProjectsView handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} projects={projects} errors={errors} navigateToUsers={navigateToUsers} navigateToDetails={navigateToDetails} />
        </>
    )
}
export default ProjectsController