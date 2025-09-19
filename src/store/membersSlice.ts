import { MembersDto } from "../types/MembersDto";
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    currentMember: MembersDto;
    members: MembersDto[]
} = {
    currentMember: {
        memberId: '',
        userId: '',
        gameId: '',
        name: '',
        weightGoal: 0,
        vacationStartDate: '',
        //payments?: Record<'', 0>,
        //weights?: Record<'', 0>;
    },
    members: []
};

export const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        setMembers: (state, action: PayloadAction<MembersDto[]>) => {
            state.members = action.payload;
        },
        setCurrentMember: (state, action: PayloadAction<MembersDto>) => {
            state.currentMember = action.payload;
        }
    }

});

export const { setMembers, setCurrentMember } = membersSlice.actions;
export default membersSlice.reducer;