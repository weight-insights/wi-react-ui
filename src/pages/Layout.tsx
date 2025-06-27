import { Outlet, useNavigate } from 'react-router-dom';
import WiMenu from '../components/WiMenu';
import { Box, Button } from '@mui/material';


export default function Layout({ logout } : { logout: () => void }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <Box sx={ { maxWidth: '800px', margin: 'auto' } }>
      <Outlet />
      <Button variant="contained" onClick={handleLogout}>Logout</Button>
      <WiMenu />
    </Box>
  );
}
