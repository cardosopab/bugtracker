import Project from "../../Project";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { ProjectsEndpoints } from "../../../constants/endpoints";
import { setProjects } from "../../redux/projectsSlice";

export const useProjectActions = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const createProject = async (
    name: string,
    description: string,
    companyId: string
  ) => {
    if (currentUser.role === "Demo") {
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
      if (error.response) {
        console.error("Server responded with an error:", error.response.status);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received from the server");
        alert("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const readProjects = async () => {
    try {
      const res = await axios.get(ProjectsEndpoints.PROJECTS);
      dispatch(setProjects(res.data));
    } catch (error: any) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.status);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received from the server");
        alert("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const deleteProject = async (projectId: string) => {
    if (currentUser.role === "Demo") {
      return;
    }

    try {
      const res = await axios.delete(ProjectsEndpoints.PROJECT_BY_ID, {
        data: { projectId: projectId },
      });
      dispatch(setProjects(res.data));
    } catch (error: any) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.status);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("No response received from the server");
        alert("No response received from the server");
      } else {
        console.error("Error setting up the request:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const addUserToProject = async (uid: string, projectId: string) => {
    console.log(uid, projectId);
    // if (currentUser.role === "Demo") {
    //   return;
    // }
    // try {
    //   const docRef = doc(database, PROJECTS_COLLECTION, projectId);
    //   await setDoc(docRef, { personnel: arrayUnion(uid) }, { merge: true });
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    //   return null;
    // }
  };

  const deleteUserFromProject = async (uid: string, projectId: string) => {
    console.log(uid, projectId);
    // if (currentUser.role === "Demo") {
    //   return;
    // }
    // try {
    //   const docRef = doc(database, PROJECTS_COLLECTION, projectId);
    //   await updateDoc(docRef, {
    //     personnel: arrayRemove(uid),
    //   });
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    //   return null;
    // }
  };

  return {
    createProject,
    readProjects,
    deleteProject,
    addUserToProject,
    deleteUserFromProject,
  };
};
