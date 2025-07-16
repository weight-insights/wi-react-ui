import { UserDto } from '../types/UserDto';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


const initialState: {
    currentUser: UserDto;
    isAuthenticated: boolean
} = {
    currentUser: {
        userId: '',
        email: '',
        name: '',
        //defaultGameId?: ''
    },
    isAuthenticated: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDto>) => {
            state.currentUser = action.payload;
        },
        authenticate: (state, action: PayloadAction<string>) => {
            localStorage.setItem('accessToken', action.payload);
            state.isAuthenticated = true;
        },
        disauthenticate: (state) => {
            localStorage.removeItem('accessToken');
            state.isAuthenticated = false;
        }
    }

})

export const { setUser, authenticate, disauthenticate } = userSlice.actions;

export default userSlice.reducer;