import React from 'react';
import { useState } from 'react';
import { TextField, Select, MenuItem, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // to handle navigation
import WarningBox from '../components/WiWarningBox';

//remember to npm install @mui/x-date-pickers
//npm install dayjs
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import WiButton from '../components/WiButton';

export default function WiNewGame() {
  //declare the useState on top
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/*Creating Game form div*/}
      <div>
        <h1>Create a New Game</h1>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/*Game Name box */}
          <TextField label="Game Name" variant="outlined" fullWidth />

          {/*Game Frequency box*/}
          <Select label="Game Frequency" defaultValue="weekly">
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="biweekly">Biweekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>

          {/*Dates box*/}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Box>

            <Box sx={{ flex: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </Box>
          </Box>

          {/*Weight and Currency and Vacation Length box*/}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Row 1: Weight input + unit */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 2 }}>
                <TextField
                  label="Minimum Weight loss per Weight Date"
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Select defaultValue="kg" fullWidth>
                  <MenuItem value="kg">Kg</MenuItem>
                  <MenuItem value="lb">Lb</MenuItem>
                </Select>
              </Box>
            </Box>

            {/* Row 2: Fee input + currency */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 2 }}>
                <TextField label="Game Fee" fullWidth />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Select defaultValue="cad" fullWidth>
                  <MenuItem value="cad">CAD$</MenuItem>
                  <MenuItem value="usd">US$</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: 2 }}>
            <TextField label="Vacation Length" fullWidth />
          </Box>

          {/*Create button*/}
          <Button>Create!</Button>
        </Box>
      </div>

      {/*Return to the Home Page div*/}
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2 }}>
          <WiButton onClick={() => setShowWarning(true)}>
            Return to Home
          </WiButton>
        </Box>
        {showWarning && (
          <WarningBox
            title="Unsaved Progress"
            message="Are you sure you want to return? Your game has not been saved."
            onConfirm={() => navigate('/')}
            onClose={() => setShowWarning(false)}
          />
        )}
      </div>
    </>
  );
}
