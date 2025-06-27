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
            <Route index element={<WiHome/>} />
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

export default App;
