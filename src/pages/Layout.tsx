import { Outlet } from 'react-router-dom';
import WiMenu from '../components/WiMenu';
import { Box } from '@mui/material';

export default function Layout() {
  return (
    <Box sx={ { maxWidth: '800px', margin: 'auto' } }>
      <Outlet />
      <WiMenu />
    </Box>
  );
}
