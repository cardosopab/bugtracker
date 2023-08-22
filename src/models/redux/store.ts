// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import storiesReducer from './storiesSlice';
import drawerReducer from './drawerSlice';
import projectsReducer from './projectsSlice';
import usersReducer from './usersSlice';
import projectDetailsReducer from './projectDetailsSlice';
import ticketsReducer from './ticketsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        drawer: drawerReducer,
        stories: storiesReducer,
        projects: projectsReducer,
        users: usersReducer,
        projectDetails: projectDetailsReducer,
        tickets: ticketsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>; // Define RootState type
export default store;
