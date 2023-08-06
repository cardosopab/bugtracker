import { collection, addDoc, onSnapshot, doc, setDoc, query, orderBy } from "firebase/firestore";
import { database } from "./firebase-config";
import Project from "../Project";
import { PROJECTS } from "./databaseEndpoints";

// const addMessage = async (message: string) => {
//     try {
//         const docRef = await addDoc(collection(database, STORIES), { message: message, createdAt: Date.now() }); console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }

const createProject = async (name: string, description: string) => {
    try {
        const docRef = doc(collection(database, PROJECTS));

        // Create the Project object with the generated ID
        const newProject: Project = {
            id: docRef.id,
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

// const readStories = (): any => {
//     const arr: any = [];
//     const unsub = onSnapshot(collection(database, STORIES), (querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             arr.push(doc.data().message);
//             console.log(doc.data().message)
//         });
//     });
//     return [unsub, arr];
// };



export { createProject };