import { useTradeStore } from "../store/tradeStore";
import { draftPickValues } from "../data/draftValues";
import {
  Paper,
  Typography,
  LinearProgress,
  Box,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { Chip } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#D8C0F0",
    ...theme.applyStyles("dark", {
      backgroundColor: "#D8C0F0",
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#8003fC",
    ...theme.applyStyles("dark", {
      backgroundColor: "#8003fC",
    }),
  },
}));

const ValueComparison = () => {
  const picksA = useTradeStore((s) => s.picksA);
  const picksB = useTradeStore((s) => s.picksB);

  const totalA = picksA.reduce(
    (sum, pick) => sum + (draftPickValues[pick] || 0),
    0
  );
  const totalB = picksB.reduce(
    (sum, pick) => sum + (draftPickValues[pick] || 0),
    0
  );

  const verdict =
    totalA === totalB
      ? "Balanced Trade"
      : totalA > totalB
      ? "Favors Team B"
      : "Favors Team A";

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Value Comparison
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Typography>
          <strong>Team A</strong> gives up: {totalA} points
        </Typography>
        <Typography>
          <strong>Team B</strong> gives up: {totalB} points
        </Typography>
      </Box>

      <BorderLinearProgress
        variant="determinate"
        value={totalA + totalB === 0 ? 50 : (totalA / (totalA + totalB)) * 100}
        sx={{ height: 35, borderRadius: 2, mb: 2, backgroundColor: "#D8C0F0" }}
      />

      <Box mt={2} display="flex" justifyContent="center">
        <Chip
          label={verdict}
          sx={{
            fontWeight: 500,
            fontSize: '0.875rem',
            borderRadius: '9999px',
            paddingY: '2px',
            paddingX: '12px',
            height: '32px',
            color: verdict === "Balanced Trade" ? "white" : "#333",
            bgcolor:
              verdict === "Balanced Trade"
                ? "info.main"
                : verdict.includes("Team A")
                ? "#f28b82"
                : "#81c995",
          }}
        />
      </Box>
    </Paper>
  );
};

export default ValueComparison;
