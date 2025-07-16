import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { useState } from "react";
import NotFound from './pages/NotFound';
import WiHome from './pages/WiHome';
import WiPlay from './pages/WiPlay';
import WiWeight from './pages/WiWeight';
import WiPayment from './pages/WiPayment';
import SignInUp from './pages/SignInUp';
import { Box, CssBaseline } from '@mui/material';
import ProtectedRoute from './pages/ProtectedRoute';
import Landing from './pages/Landing';
import { GameDto } from './types/GamesDto';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  function login() : void {
    setIsAuthenticated(true);
  }

  function logout() : void {
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
  }

  return (
    <Box>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated} logout={logout}/>}>
                <Route index element={<Landing />} />
                <Route path='/play' element={<WiPlay />} />
                <Route path='/weight' element={<WiWeight />} />
                <Route path='/payment' element={<WiPayment />} />
              </Route>
              <Route path='/sign-in' element={<SignInUp login={login} logout={logout} isSignIn={true} />} />
              <Route path='/sign-up' element={<SignInUp login={login} logout={logout} isSignIn={false}/>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Box> 
  );
}



const FAKE_GAMES: GameDto[] = [
      {
          gameId: 'abc',
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
          gameId: 'abc',
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
          gameId: 'abc',
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

export default App;
