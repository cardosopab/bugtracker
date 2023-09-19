import { doc, collection, setDoc, updateDoc, arrayRemove, arrayUnion, deleteDoc } from "firebase/firestore";
import { database } from "../firebase-init";
import { PROJECTS_COLLECTION } from "../collections";
import Project from "../../Project";

export const useProjectActions = () => {

  const createProject = async (name: string, description: string, companyId: string) => {
    try {
      const docRef = doc(collection(database, PROJECTS_COLLECTION));

      const newProject: Project = {
        id: docRef.id,
        companyId: companyId,
        name: name,
        description: description,
        createdAt: Date.now(),
        personnel: [],
      };

      await setDoc(docRef, newProject);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const docRef = doc(database, PROJECTS_COLLECTION, projectId);
      await deleteDoc(docRef);
      console.log("Document removed with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }

  }

  const addUserToProject = async (uid: string, projectId: string) => {
    try {
      const docRef = doc(database, PROJECTS_COLLECTION, projectId);
      await setDoc(docRef, { personnel: arrayUnion(uid) }, { merge: true });
      console.log("Document written with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  const deleteUserFromProject = async (uid: string, projectId: string) => {
    try {
      const docRef = doc(database, PROJECTS_COLLECTION, projectId);
      await updateDoc(docRef, {
        personnel: arrayRemove(uid)
      });
      console.log("Document removed with ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  return { createProject, deleteProject, addUserToProject, deleteUserFromProject };
};
