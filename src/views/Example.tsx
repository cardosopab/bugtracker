import { signOut } from "firebase/auth"
import { auth } from "../models/database/firebase-config"
import { useNavigate } from "react-router-dom";
// import { addMessage, readStories } from "../models/database/database";
import { useEffect, useState } from "react";
// import { collection, onSnapshot, query, orderBy, } from "firebase/firestore";
// import firebase from "firebase/compat/app";
// import { database } from "../models/database/firebase-config";
import Button from '@mui/material/Button';
import { Avatar, Box, Card, Chip, Divider, IconButton, Stack, Drawer, Switch, Typography } from "@mui/material";
import Story from "../models/Story";
import React from "react";

function Stories() {
    const [stories, setStories] = useState<Story[]>([]);
    const [drawer, setDrawer] = useState(false);
    const navigateTo = useNavigate();
    const handleSignOut = () => {
        signOut(auth).then(response => {
            console.log('response', response);
            navigateTo('/');
        });
    }
    console.log('authStories', auth.currentUser)
    const email = auth.currentUser?.email;
    const handleMessageButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const messageInput = e.currentTarget.message as HTMLInputElement;
        const message = messageInput.value;
        // addMessage(message);
        // Clear the input field after adding the message (optional)
        messageInput.value = '';
    };
    // useEffect(() => {
    //     const unsubscribe = onSnapshot(
    //         query(collection(database, "stories"), orderBy("createdAt", "desc")),
    //         (querySnapshot) => {
    //             const arr: any[] = [];
    //             querySnapshot.forEach((doc) => {
    //                 arr.push(doc.data().message);
    //             });
    //             setStories(arr);
    //         }
    //     );

    //     return () => unsubscribe();
    // }, []);
    const toggleDrawer = () => {
        setDrawer(prev => !prev)
    }
    // useEffect(() => {
    //     const unsubscribe = onSnapshot(
    //         query(collection(database, "stories"), orderBy("createdAt", "desc")),
    //         (querySnapshot) => {
    //             const arr: Story[] = [];
    //             querySnapshot.forEach((doc) => {
    //                 const data = doc.data();
    //                 const story: Story = {
    //                     message: data.message,
    //                     createdAt: data.createdAt as firebase.firestore.Timestamp,
    //                 };
    //                 arr.push(story);
    //             });
    //             setStories(arr);
    //         }
    //     );

    //     return () => unsubscribe();
    // }, []);
    return (
        <>
            <div className="card">
                <React.Fragment key={'left'}>
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    <Drawer
                        variant="persistent"
                        anchor={'left'}
                        open={drawer}
                        onClose={toggleDrawer}
                    >
                        {/* {list(anchor)} */}
                        Yoooo
                    </Drawer>
                </React.Fragment>

                <Button variant="contained" color="secondary" onClick={() => toggleDrawer()}>Left Drawer</Button>
                <Card>
                    <Box sx={{ p: 2, display: 'flex' }}>
                        <Avatar variant="rounded" src="avatar1.jpg" />
                        <Stack spacing={0.5}>
                            <Typography fontWeight={700}>Michael Scott</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {/* <LocationOn sx={{ color: grey[500] }} /> Scranton, PA */}
                                Scranton, PA
                            </Typography>
                        </Stack>
                        <IconButton>
                            {/* <Edit sx={{ fontSize: 14 }} /> */}
                            Edit
                        </IconButton>
                    </Box>
                    <Divider />
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                    >
                        <Chip label="Chip Filled" />
                        <Chip label="Chip Outlined" variant="outlined" />
                        <Switch />
                    </Stack>
                </Card>
                <h1>{`Welcome Stories, ${email}`}</h1>
                <button onClick={handleSignOut}>SignOut</button>
                <form onSubmit={handleMessageButton}>
                    <button type="submit" >Send Message!</button>
                    <input type="text" name="message" />
                </form>
                {stories.length !== 0 ? (
                    <ul>
                        {stories.map((story: Story) => (
                            <li key={story.message}>{story.message}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No stories found.</p>
                )}
            </div>
        </>
    )
}
export default Stories