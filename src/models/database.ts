import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { database } from "./firebase-config";
const STORIES = 'stories';

const addMessage = async (message: string) => {
    try {
        const docRef = await addDoc(collection(database, STORIES), { message: message, createdAt: Date.now() }); console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// const readStories = async () => {
//     const querySnapshot = await getDocs(collection(database, "stories"));
//     return querySnapshot;
// }
const readStories = (): any => {
    const arr: any = [];
    const unsub = onSnapshot(collection(database, STORIES), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            arr.push(doc.data().message);
            console.log(doc.data().message)
        });
    });
    return [unsub, arr];
};



export { addMessage, readStories };