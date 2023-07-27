import { signOut } from "firebase/auth"
import { auth } from "../models/firebase-config"
import { useNavigate } from "react-router-dom";
import { addMessage, readStories } from "../models/database";
import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { database } from "../models/firebase-config";

function Home() {
    const [stories, setStories] = useState<any>(null);
    const navigateTo = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(response => {
            console.log('response', response);
            navigateTo('/');
        });
    }
    console.log('authHome', auth)
    const email = auth.currentUser?.email;
    const handleMessageButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const messageInput = e.currentTarget.message as HTMLInputElement;
        const message = messageInput.value;
        addMessage(message);
        // Clear the input field after adding the message (optional)
        messageInput.value = '';
    };
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(database, 'stories'), (querySnapshot) => {
            let arr: any = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data().message);
                console.log(doc.data().message)
            });
            setStories(arr);
        });

        return () => unsubscribe();
    }, [])
    return (
        <div className="card">
            <h1>{`Welcome home, ${email}`}</h1>
            <button onClick={handleSignOut}>SignOut</button>
            <form onSubmit={handleMessageButton}>
                <button type="submit" >Send Message!</button>
                <input type="text" name="message" />
            </form>
            {stories !== null ? (
                <ul>
                    {stories.map((message: string) => (
                        <li key={message}>{message}</li>
                    ))}
                </ul>
            ) : (
                <p>No stories found.</p>
            )}
        </div>
    )
}
export default Home