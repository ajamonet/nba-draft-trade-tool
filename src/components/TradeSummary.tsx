import { useTradeStore } from '../store/tradeStore';
import { Paper, Typography } from '@mui/material';

const TradeSummary = () => {
  const teamA = useTradeStore((s) => s.teamA);
  const teamB = useTradeStore((s) => s.teamB);
  const picksA = useTradeStore((s) => s.picksA);
  const picksB = useTradeStore((s) => s.picksB);

  return (
    <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }} elevation={3}>
        <Typography variant="h6" gutterBottom  sx={{borderBottom: '2px solid #A581CC'}}>
        Trade Evaluator
      </Typography>
      <Typography variant="h6" gutterBottom>
        Trade Summary
      </Typography>
      <Typography><strong>{teamA}</strong> sends: {picksA.join(', ') || 'None'}</Typography>
      <Typography><strong>{teamB}</strong> sends: {picksB.join(', ') || 'None'}</Typography>
    </Paper>
  );
};

export default TradeSummary;
