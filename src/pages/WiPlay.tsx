import { Box, Paper, Stack } from '@mui/material';

export default function WiPlay() {
  return (
    <Box sx={{ width: '80%' }}>
      <Stack spacing={2}>
        <Paper>Weight</Paper>
        <Paper>Payment</Paper>
        <Paper>Vacation</Paper>
      </Stack>
    </Box>
  );
}