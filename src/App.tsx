import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';
import WiHome from './pages/WiHome';
import WiPlay from './pages/WiPlay';
import WiWeight from './pages/WiWeight';
import WiPayment from './pages/WiPayment';
import WiNewGame from './pages/WiNewGame';
import { Box, CssBaseline } from '@mui/material';

function App() {
  return (
    <Box>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WiHome />} />
            <Route path="/play" element={<WiPlay />} />
            <Route path="/weight" element={<WiWeight />} />
            <Route path="/payment" element={<WiPayment />} />
            <Route path="new-game" element={<WiNewGame />} />
          </Route>
          <Route path="/signin" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
