import { Typography, Button, Tooltip, Box } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'; //Add game icon
import { GameDto } from '../types/GamesDto';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useEffect } from 'react';
import { setGames } from '../store/gamesSlice';
import { disauthenticate } from '../store/userSlice';
import { getAllUsersGames } from '../services/game.service';


export default function Landing() {
    
    const {games} = useSelector((state: RootState) => state.games);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {

      getAllUsersGames()
                  .then((response) => {
                      console.log('response status', response.status, typeof response.status);
                      if (response.status >= 400) {
                          throw new Error('Failed to get this user\'s games');
                      }
                      return response.json();
                  })
                  .then((body: any) => {
                      dispatch(setGames(body));
                  })
                  .catch((error) => {
                      console.log('error:', error);
                  });

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