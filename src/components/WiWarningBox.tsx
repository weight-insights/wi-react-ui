import { Box, Typography, Button, Paper } from '@mui/material';

type WarningBoxProps = {
  title: string;
  message: string;
  onClick?: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

export default function WarningBox({
  title,
  message,
  onConfirm,
  onClose,
}: WarningBoxProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: 300, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {message}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
