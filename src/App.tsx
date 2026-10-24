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
import Layout from './pages/Layout';
import { GameDto } from './types/GamesDto';
import Landing from './pages/Landing';
import { GameLanding } from './pages/GameLanding';
import FirstTimeOnGame from './pages/FirstTimeOnGame';


function App() {

  return (
    <Box>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute/>}>
            <Route index element={<Landing />} />
            <Route path='/play' element={<GameLanding />} />
            <Route path='/set-weight-goal' element={<FirstTimeOnGame />} />
            <Route path='/weight' element={<WiWeight />} />
            <Route path='/payment' element={<WiPayment />} />
          </Route>
          <Route path='/sign-in' element={<SignInUp isSignIn={true} />} />
          <Route path='/sign-up' element={<SignInUp isSignIn={false}/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box> 
  );
}

export default App;
