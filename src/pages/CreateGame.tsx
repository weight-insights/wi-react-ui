
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { createGame } from '../services/game.service';
import { setCurrentGame } from '../store/gamesSlice';
import type { GameDto } from '../types/GamesDto';

interface FormValues {
  name: string;
  gamePeriod: number;
  startDate: string;
  endDate: string;
  minWeightLoss: string;
  weightUnit: string;
  fee: string;
  currency: string;
  vacationLength: number;
}

// Get today's LOCAL date in YYYY-MM-DD format.
function getToday(): string {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Add calendar days without timezone-related date shifts.
function addDays(dateString: string, days: number): string {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
}

// Calculate calendar-day difference.
function daysBetween(start: string, end: string): number {
  const startTime = Date.parse(`${start}T00:00:00Z`);
  const endTime = Date.parse(`${end}T00:00:00Z`);

  return Math.round((endTime - startTime) / 86400000);
}

export default function CreateGame() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState<FormValues>(() => {
    const today = getToday();

    return {
      name: '',
      gamePeriod: 7,
      startDate: today,
      endDate: addDays(today, 56),
      minWeightLoss: '0.1',
      weightUnit: 'kg',
      fee: '5',
      currency: 'CAD',
      vacationLength: 1,
    };
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Update any individual form field.
  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  // Update frequency and recalculate default end date.
  function changeFrequency(period: number) {
    setForm(prev => ({
      ...prev,
      gamePeriod: period,
      endDate: addDays(prev.startDate, period * 8),
    }));
  }

  // Update start date and preserve an eight-period duration.
  function changeStartDate(value: string) {
    setForm(prev => ({
      ...prev,
      startDate: value,
      endDate: value
        ? addDays(value, prev.gamePeriod * 8)
        : prev.endDate,
    }));
  }

  const durationDays =
    form.startDate && form.endDate
      ? daysBetween(form.startDate, form.endDate)
      : NaN;

  const scheduledWeighIns =
    Number.isFinite(durationDays) &&
    durationDays >= 0 &&
    durationDays % form.gamePeriod === 0
      ? durationDays / form.gamePeriod + 1
      : null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const name = form.name.trim();
    const minWeightLoss = Number(form.minWeightLoss);
    const fee = Number(form.fee);

    // Validate game name.
    if (name.length < 3 || name.length > 80) {
      setError('Game name must contain between 3 and 80 characters.');
      return;
    }

    // Validate dates.
    if (!form.startDate || !form.endDate) {
      setError('Please select a start date and an end date.');
      return;
    }

    if (form.startDate < getToday()) {
      setError('Start date cannot be in the past.');
      return;
    }

    if (form.endDate <= form.startDate) {
      setError('End date must be after the start date.');
      return;
    }

    if (scheduledWeighIns === null) {
      setError(
        'The end date must match the selected weigh-in frequency.'
      );
      return;
    }

    if (scheduledWeighIns < form.vacationLength + 3) {
      setError(
        'The game needs at least 3 weigh-ins excluding vacation.'
      );
      return;
    }

    // Validate weight loss.
    if (
      form.minWeightLoss.trim() === '' ||
      !Number.isFinite(minWeightLoss) ||
      minWeightLoss <= 0
    ) {
      setError('Minimum weight loss must be greater than zero.');
      return;
    }

    // Validate fee.
    if (
      form.fee.trim() === '' ||
      !Number.isFinite(fee) ||
      fee < 0
    ) {
      setError('Game fee must be zero or greater.');
      return;
    }

    setLoading(true);

    try {
      const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

      const response = await createGame({
        name,
        startDate: form.startDate,
        gameLength: scheduledWeighIns,
        gamePeriod: form.gamePeriod,
        gameTimeZone: timezone,
        minWeightLoss,
        weightUnit: form.weightUnit,
        fee,
        currency: form.currency,
        vacationLength: form.vacationLength,
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = Array.isArray(body.message)
          ? body.message.join(', ')
          : typeof body.message === 'string'
            ? body.message
            : 'Failed to create the game.';

        throw new Error(message);
      }

      const newGame = body as GameDto;

      if (!newGame.gameId) {
        throw new Error('The server did not return a game ID.');
      }

      // Store selected game and navigate to its dashboard.
      dispatch(setCurrentGame(newGame));
      navigate('/play');

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while creating the game.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 680,
        mx: 'auto',
        px: { xs: 1, sm: 2 },
        py: 3,
      }}
    >
      {/* BACK BUTTON */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 2 }}
        disabled={loading}
      >
        Back to Home
      </Button>

      {/* MAIN FORM */}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            px: { xs: 2.5, sm: 4 },
            py: 3,
            bgcolor: '#F7F8FC',
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Create a Game
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Set up your weight challenge and invite participants later.
          </Typography>
        </Box>

        <Divider />

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ p: { xs: 2.5, sm: 4 } }}
        >
          <Stack spacing={3}>
            {/* ERROR MESSAGE */}
            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            {/* GAME NAME */}
            <TextField
              label="Game Name"
              placeholder="e.g. Summer Weight Challenge"
              fullWidth
              required
              value={form.name}
              onChange={e => updateField('name', e.target.value)}
              inputProps={{ maxLength: 80 }}
              helperText="Give your challenge a name."
            />

            {/* GAME FREQUENCY */}
            <TextField
              select
              fullWidth
              required
              label="Game Frequency"
              value={form.gamePeriod}
              onChange={e => changeFrequency(Number(e.target.value))}
              helperText="How often participants must record their weight."
            >
              <MenuItem value={7}>Weekly (7 days)</MenuItem>
              <MenuItem value={14}>Biweekly (14 days)</MenuItem>
              <MenuItem value={30}>Every 30 days</MenuItem>
            </TextField>

            {/* START AND END DATES */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Start Date"
                  type="date"
                  value={form.startDate}
                  onChange={e => changeStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: getToday() }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="End Date"
                  type="date"
                  value={form.endDate}
                  onChange={e => updateField('endDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: form.startDate }}
                />
              </Grid>
            </Grid>

            <Alert severity="info" icon={false}>
              {scheduledWeighIns !== null
                ? `${scheduledWeighIns} scheduled weigh-ins, including the first and last.`
                : 'Choose an end date that matches your weigh-in frequency.'}
            </Alert>

            {/* WEIGHT LOSS AND UNIT */}
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  label="Minimum Weight Loss"
                  type="number"
                  fullWidth
                  required
                  value={form.minWeightLoss}
                  onChange={e =>
                    updateField('minWeightLoss', e.target.value)
                  }
                  inputProps={{ min: '0.01', step: '0.01' }}
                  helperText="Required loss per weigh-in."
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label="Weight Unit"
                  value={form.weightUnit}
                  onChange={e =>
                    updateField('weightUnit', e.target.value)
                  }
                >
                  <MenuItem value="kg">kg</MenuItem>
                  <MenuItem value="lbs">lbs</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {/* FEE AND CURRENCY */}
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  label="Game Fee"
                  type="number"
                  fullWidth
                  required
                  value={form.fee}
                  onChange={e => updateField('fee', e.target.value)}
                  inputProps={{ min: '0', step: '0.01' }}
                  helperText="Set 0 for a free game."
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label="Currency"
                  value={form.currency}
                  onChange={e =>
                    updateField('currency', e.target.value)
                  }
                >
                  <MenuItem value="CAD">CAD ($)</MenuItem>
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="BRL">BRL (R$)</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {/* VACATION LENGTH */}
            <TextField
              select
              fullWidth
              label="Vacation Length"
              value={form.vacationLength}
              onChange={e =>
                updateField(
                  'vacationLength',
                  Number(e.target.value)
                )
              }
              helperText="Number of weigh-in events a participant may skip."
            >
              <MenuItem value={0}>No vacation</MenuItem>
              <MenuItem value={1}>1 weigh-in</MenuItem>
              <MenuItem value={2}>2 weigh-ins</MenuItem>
              <MenuItem value={3}>3 weigh-ins</MenuItem>
              <MenuItem value={4}>4 weigh-ins</MenuItem>
            </TextField>

            <Divider />

            {/* CREATE BUTTON */}
            <Stack direction="row" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={
                  loading
                    ? <CircularProgress size={18} color="inherit" />
                    : <AddCircleOutlineIcon />
                }
                sx={{
                  minWidth: 180,
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                {loading ? 'Creating...' : 'Create Game'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
