
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

import type { RootState } from '../store/store';
import type { MembersDto } from '../types/MembersDto';
import { authApiCall } from '../services/apiWrapper';

const USE_DEMO = import.meta.env.VITE_DEMO_MEMBERS === 'true';

interface Measurement {
  date: string;
  weight: number;
}

function getMeasurements(member?: MembersDto): Measurement[] {
  return Object.entries(member?.weights ?? {})
    .filter(([, weight]) => Number.isFinite(weight) && weight > 0)
    .map(([date, weight]) => ({ date, weight }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function getPercentageLoss(member: MembersDto): number | null {
  const entries = getMeasurements(member);

  if (entries.length === 0) return null;

  const initial = entries[0].weight;
  const current = entries[entries.length - 1].weight;

  return ((initial - current) / initial) * 100;
}

function getTotalPaid(member?: MembersDto): number {
  return Object.values(member?.payments ?? {}).reduce(
    (sum, amount) => sum + amount,
    0
  );
}

function WeightChart({
  member,
  unit
}: {
  member?: MembersDto;
  unit: string;
}) {
  const entries = getMeasurements(member);

  if (entries.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
        No weight entries yet.
      </Typography>
    );
  }

  const weights = entries.map(entry => entry.weight);
  const goal = member?.weightGoal;
  const hasGoal = typeof goal === 'number' && goal > 0;

  const values = hasGoal ? [...weights, goal] : weights;
  const minWeight = Math.min(...values);
  const maxWeight = Math.max(...values);
  const padding = Math.max((maxWeight - minWeight) * 0.15, 1);
  const lower = minWeight - padding;
  const upper = maxWeight + padding;

  const getX = (index: number) =>
    45 + (index / Math.max(entries.length - 1, 1)) * 320;

  const getY = (weight: number) =>
    175 - ((weight - lower) / (upper - lower)) * 140;

  const points = entries
    .map((entry, index) => `${getX(index)},${getY(entry.weight)}`)
    .join(' ');

  return (
    <Box>
      <Box
        component="svg"
        viewBox="0 0 410 220"
        role="img"
        aria-label={`Weight progress in ${unit}`}
        sx={{ width: '100%', height: 'auto' }}
      >
        {[40, 85, 130, 175].map(y => (
          <line
            key={y}
            x1="45"
            x2="375"
            y1={y}
            y2={y}
            stroke="#E5E7EB"
          />
        ))}

        <line
          x1="45" x2="45" y1="25" y2="175"
          stroke="#94A3B8"
        />

        <line
          x1="45" x2="375" y1="175" y2="175"
          stroke="#94A3B8"
        />

        {hasGoal && (
          <line
            x1="45"
            x2="375"
            y1={getY(goal)}
            y2={getY(goal)}
            stroke="#E8A23C"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
        )}

        <polyline
          points={points}
          fill="none"
          stroke="#5669C9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {entries.map((entry, index) => (
          <circle
            key={entry.date}
            cx={getX(index)}
            cy={getY(entry.weight)}
            r="5"
            fill="#5669C9"
          >
            <title>
              {`${entry.date}: ${entry.weight} ${unit}`}
            </title>
          </circle>
        ))}

        <text x="6" y="35" fontSize="12" fill="#64748B">
          {upper.toFixed(1)}
        </text>

        <text x="6" y="174" fontSize="12" fill="#64748B">
          {lower.toFixed(1)}
        </text>

        <text x="45" y="200" fontSize="12" fill="#64748B">
          Start
        </text>

        <text
          x="375"
          y="200"
          textAnchor="end"
          fontSize="12"
          fill="#64748B"
        >
          Latest
        </text>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Typography variant="caption" color="primary">
          ● Recorded weight
        </Typography>

        {hasGoal && (
          <Typography variant="caption" sx={{ color: '#B7791F' }}>
            --- Goal weight
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export function GameLanding() {
  const navigate = useNavigate();

  const game = useSelector(
    (state: RootState) => state.games.currentGame
  );

  const [members, setMembers] = useState<MembersDto[]>([]);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  useEffect(() => {
    if (!game.gameId) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError('');

    const memberEndpoint = USE_DEMO
      ? `members/demo/game/${encodeURIComponent(game.gameId)}`
      : `members/game-id/${encodeURIComponent(game.gameId)}`;

    async function loadGameData() {
      try {
        const [profileResponse, membersResponse] = await Promise.all([
          authApiCall('GET', 'auth/profile'),
          authApiCall('GET', memberEndpoint)
        ]);

        if (!profileResponse.ok || !membersResponse.ok) {
          throw new Error('Failed to load game data.');
        }

        const profile = await profileResponse.json();
        const memberList = await membersResponse.json() as MembersDto[];

        if (active) {
          setUserId(profile.sub);
          setMembers(memberList);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : 'Unknown error'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadGameData();

    return () => {
      active = false;
    };
  }, [game.gameId]);

  const currentMember = members.find(
    member => member.userId === userId
  );

  const isAdmin = Boolean(userId && game.adminId === userId);

  const percentageLoss = currentMember
    ? getPercentageLoss(currentMember)
    : null;

  const moneyPaid = getTotalPaid(currentMember);

  const totalCollected = members.reduce(
    (sum, member) => sum + getTotalPaid(member),
    0
  );

  const unit = game.weightUnit || 'kg';

  const formatMoney = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: game.currency || 'CAD'
    }).format(value);

  const ranking = members
    .map(member => ({
      member,
      percentage: getPercentageLoss(member)
    }))
    .sort(
      (a, b) =>
        (b.percentage ?? -Infinity) -
        (a.percentage ?? -Infinity)
    );

  const displayedRanking = showAll
    ? ranking
    : ranking.slice(0, 4);

  const paymentEntries = members
    .flatMap(member =>
      Object.entries(member.payments ?? {}).map(([date, amount]) => ({
        name: member.name,
        date,
        amount
      }))
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  if (!game.gameId) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          No game selected. Please choose a game from Home.
        </Alert>

        <Button onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 2, pb: 8 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back
        </Button>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h5" fontWeight={700} noWrap>
            {game.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Every {game.gamePeriod || 7} days
          </Typography>
        </Box>

        {isAdmin && (
          <Chip
            icon={<AdminPanelSettingsOutlinedIcon />}
            label="Admin"
            size="small"
            color="primary"
          />
        )}
      </Stack>

      {USE_DEMO && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Demo mode: participant data is simulated by the backend.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : !error && (
        <>
          {!currentMember && !isAdmin && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              You are not registered as a participant in this game.
            </Alert>
          )}

          {(currentMember || isAdmin) && (
            <>
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ mb: 2 }}
              >
                <Button
                  disabled
                  startIcon={<BeachAccessOutlinedIcon />}
                >
                  Set vacation
                </Button>
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: '1fr 1.4fr'
                  },
                  gap: 2,
                  mb: 3
                }}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: '#FFF9ED'
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <SavingsOutlinedIcon
                      sx={{
                        fontSize: 85,
                        color: '#D6A342'
                      }}
                    />

                    <Typography color="text.secondary">
                      Total payments collected
                    </Typography>

                    <Typography variant="h3" fontWeight={800}>
                      {formatMoney(totalCollected)}
                    </Typography>

                    <Button
                      size="small"
                      onClick={() => setShowPayments(!showPayments)}
                    >
                      {showPayments ? 'Hide payments' : 'View payments'}
                    </Button>

                    {isAdmin && (
                      <Stack spacing={1} sx={{ width: '100%' }}>
                        <Button
                          disabled
                          variant="contained"
                          startIcon={<AdminPanelSettingsOutlinedIcon />}
                        >
                          Set Player Payment
                        </Button>

                        <Button disabled variant="outlined">
                          Invite Participants
                        </Button>
                      </Stack>
                    )}
                  </Stack>

                  <Collapse in={showPayments}>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Payment history
                    </Typography>

                    {paymentEntries.map((payment, index) => (
                      <Stack
                        key={`${payment.name}-${payment.date}-${index}`}
                        direction="row"
                        justifyContent="space-between"
                        sx={{ py: 0.5 }}
                      >
                        <Typography variant="body2">
                          {payment.name} · {payment.date}
                        </Typography>

                        <Typography variant="body2" fontWeight={600}>
                          {formatMoney(payment.amount)}
                        </Typography>
                      </Stack>
                    ))}
                  </Collapse>
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{ p: 3, borderRadius: 3 }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        Your Progress
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {currentMember
                          ? `${getMeasurements(currentMember).length} weight entries`
                          : 'No weight profile'}
                      </Typography>
                    </Box>

                    <Chip
                      variant="outlined"
                      color={
                        percentageLoss !== null && percentageLoss > 0
                          ? 'success'
                          : 'default'
                      }
                      label={
                        percentageLoss === null
                          ? 'No data'
                          : `${percentageLoss.toFixed(1)}% lost`
                      }
                    />
                  </Stack>

                  <WeightChart
                    member={currentMember}
                    unit={unit}
                  />

                  {currentMember && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mt: 2 }}
                    >
                      <Typography variant="body2">
                        Initial: {
                          getMeasurements(currentMember)[0]?.weight ?? '—'
                        } {unit}
                      </Typography>

                      <Typography variant="body2">
                        Goal: {currentMember.weightGoal} {unit}
                      </Typography>
                    </Stack>
                  )}
                </Paper>
              </Box>

              <Paper
                variant="outlined"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Payment Summary
                  </Typography>
                </Box>

                <Divider />

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)'
                  }}
                >
                  {[
                    { label: 'Total Fees', value: '—' },
                    { label: 'You Paid', value: formatMoney(moneyPaid) },
                    { label: 'You Owe', value: '—' }
                  ].map(item => (
                    <Box
                      key={item.label}
                      sx={{
                        p: { xs: 1, sm: 3 },
                        textAlign: 'center'
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.label}
                      </Typography>

                      <Typography variant="h6" fontWeight={700}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                
              </Paper>

              <Paper
                variant="outlined"
                sx={{ borderRadius: 3, overflow: 'hidden' }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ p: 2 }}
                >

                  <Typography variant="h6" fontWeight={700}>
                    Leaderboard
                  </Typography>
                </Stack>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#F6F8FC' }}>
                        <TableCell>Position</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">
                          Percentage Loss
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {displayedRanking.map(
                        ({ member, percentage }, index) => (
                          <TableRow key={member.memberId}>
                            <TableCell>
                              {index + 1}
                            </TableCell>

                            <TableCell>
                              {member.name}
                            </TableCell>

                            <TableCell align="right">
                              {percentage === null
                                ? 'No data'
                                : `${percentage.toFixed(2)}%`}
                            </TableCell>
                          </TableRow>
                        )
                      )}

                      {ranking.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            No participants yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {ranking.length > 4 && (
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Button onClick={() => setShowAll(!showAll)}>
                      {showAll
                        ? 'Show less'
                        : 'View all participants'}
                    </Button>
                  </Box>
                )}
              </Paper>
            </>
          )}
        </>
      )}
    </Box>
  );
}
