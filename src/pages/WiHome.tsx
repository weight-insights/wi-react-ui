import { Typography } from '@mui/material';
import WiTable from '../components/WiTable';
import WiButton from '../components/WiButton';
import { Box } from '@mui/material';

export default function WiHome() {
  return (
    <>
      <Typography>Home</Typography>
      <WiTable></WiTable>
      <Box sx={{ paddingTop: 2, display: 'flex', justifyContent: 'center' }}>
        <WiButton to="/new-game">Create new game</WiButton>
      </Box>
    </>
  );
}
