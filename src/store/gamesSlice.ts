import { GameDto } from "../types/GamesDto";
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: {
    currentGame: GameDto;
    games: GameDto[]
} = {
    currentGame: {
        gameId: '',
        adminId: '',
        name: '',
        info: '',
        startDate: '',
        gameLength: 0, // total number of weight events, including the first and final
        gameTimeZone: '',
        gamePeriod: 0, // number of days between weight events, standard of 7 (1 week)
        minWeightLoss: 0,
        weightUnit: '',
        fee: 0,
        currency: '',
        vacationLength: 0,
    },
    games: []
}


export const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGames: (state, action: PayloadAction<GameDto[]>) => {
            state.games = action.payload;
        },
        setCurrentGame: (state, action: PayloadAction<GameDto>) => {
            state.currentGame = action.payload;
        }
    }

})

export const { setGames, setCurrentGame } = gamesSlice.actions;

export default gamesSlice.reducer;