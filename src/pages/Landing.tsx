import { Typography, Button, Tooltip, Box } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'; //Add game icon
import { GameDto } from '../types/GamesDto';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useEffect } from 'react';
import { setGames } from '../store/gamesSlice';
import { disauthenticate } from '../store/userSlice';

const FAKE_GAMES: GameDto[] = [
    {
        gameId: 'abc1',
        adminId: 'o31XRPpbamOTZ0znlYo7',
        name: 'Taliban 2025',
        info: 'fake info',
        startDate: '2025-07-09',
        gameLength: 20, // total number of weight events, including the first and final
        gameTimeZone: 'EST',
        gamePeriod: 7, // number of days between weight events, standard of 7 (1 week)
        minWeightLoss: 0.1,
        weightUnit: 'kg',
        fee: 5,
        currency: 'CAD',
        vacationLength: 2
    },
    {
        gameId: 'abc2',
        adminId: 'o31XRPpbamOTZ0znlYo7',
        name: 'Taliban 2025',
        info: 'fake info',
        startDate: '2025-07-09',
        gameLength: 20, // total number of weight events, including the first and final
        gameTimeZone: 'EST',
        gamePeriod: 7, // number of days between weight events, standard of 7 (1 week)
        minWeightLoss: 0.1,
        weightUnit: 'kg',
        fee: 5,
        currency: 'CAD',
        vacationLength: 2
    },
    {
        gameId: 'abc3',
        adminId: 'o31XRPpbamOTZ0znlYo7',
        name: 'Taliban 2025',
        info: 'fake info',
        startDate: '2025-07-09',
        gameLength: 20, // total number of weight events, including the first and final
        gameTimeZone: 'EST',
        gamePeriod: 7, // number of days between weight events, standard of 7 (1 week)
        minWeightLoss: 0.1,
        weightUnit: 'kg',
        fee: 5,
        currency: 'CAD',
        vacationLength: 2
    }

];

export default function Landing() {
    
    const {games} = useSelector((state: RootState) => state.games);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setGames(FAKE_GAMES));
    }, []);

    const colours = ["FFC09F", "FFEE93", "A0CED9", "ADF7B6", "BC96E6"];
    function randomColour() {
        let randomColourIndex = Math.floor(Math.random() * colours.length);
        let randomColour = colours[randomColourIndex];
        return randomColour;

    }


    return (
    <>
    <div style={{minWidth: "100vw", height: "100px"}}>
        <Typography>Home</Typography>
    </div>
    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", alignContent: "flex-start", flexDirection: "row", margin: "auto", width: "300px", height: "500px", maxHeight: "100vh"}}>
      {games?.map((game) => (
        <Button
            key={game.gameId}
            variant="contained"
            onClick={() => navigate('/play')}
            style={{height: "80px", width: "130px", background: "#BC96E6", color: "white", margin: "10px", textAlign: "center", alignContent: "center"}}>
            {game.name}
        </Button>
        ))}
      <Tooltip title="Create New Game">
        <Button variant="contained" style={{height: "80px", width: "130px", background: "#D0CCD0", color: "white", margin: "10px", textAlign: "center", alignContent: "center"}}><AddCircleOutlineOutlinedIcon fontSize="large"/></Button>
      </Tooltip>

      <Box sx={ { maxWidth: '800px', margin: 'auto' } }>
        <Button variant="contained" onClick={() => {dispatch(disauthenticate()); navigate('/')}}>Logout</Button>
        {/* <WiMenu /> */}
      </Box>
      
    </div>
    </>
  );
}