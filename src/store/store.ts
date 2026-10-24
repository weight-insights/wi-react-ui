import { configureStore } from '@reduxjs/toolkit';
import  gamesReducer from './gamesSlice';
import userReducer from './userSlice';
import membersReducer from './membersSlice';


export const store = configureStore({
    reducer: {
        games: gamesReducer,
        user: userReducer,
        members: membersReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
