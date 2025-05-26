import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { TradeRecord } from "../types/trade";
import { nbaTeams } from "../data/nbaTeams";

type SavedTradesProps = {
  open: boolean;
  onClose: () => void;
  trades: TradeRecord[];
};

const SavedTradesModal = ({ open, onClose, trades }: SavedTradesProps) => {
  const sortedTrades = [...trades].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getTeamLogo = (teamName: string) =>
    nbaTeams.find((t) => t.name === teamName)?.logo || "";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Saved Trades</DialogTitle>
      <DialogContent dividers>
        {sortedTrades.length === 0 ? (
          <Typography>No saved trades yet.</Typography>
        ) : (
          <Stack spacing={2}>
            {sortedTrades.map((trade) => (
              <Paper key={trade.id} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">
                  {new Date(trade.date).toLocaleString()}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    src={getTeamLogo(trade.teamA)}
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography>
                    <strong>{trade.teamA}</strong> sends:{" "}
                    {trade.picksA.join(", ") || "None"} ({trade.valueA} pts)
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <Avatar
                    src={getTeamLogo(trade.teamB)}
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography>
                    <strong>{trade.teamB}</strong> sends:{" "}
                    {trade.picksB.join(", ") || "None"} ({trade.valueB} pts)
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose()}
          variant="outlined"
          sx={{ color: "#8003fC", borderColor: "#8003fC" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SavedTradesModal;
