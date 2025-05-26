import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import Header from "./components/Header";
import SavedTradesModal from "./components/SaveTrades";
import TeamPanel from "./components/TeamPanel";
import TradeSummary from "./components/TradeSummary";
import ValueComparison from "./components/ValueComparison";
import { getSavedTrades, saveTrade } from "./utils/tradeStorage";
import { v4 as uuidv4 } from "uuid";
import { useTradeStore } from "./store/tradeStore";
import { draftPickValues } from "./data/draftValues";


function App() {
  const [showSaved, setShowSaved] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenSaved = () => setShowSaved(true);
    window.addEventListener("open-saved-trades", handleOpenSaved);
    return () =>
      window.removeEventListener("open-saved-trades", handleOpenSaved);
  }, []);

  const handleSaveTrade = () => {
    const teamA = useTradeStore.getState().teamA;
    const teamB = useTradeStore.getState().teamB;
    const picksA = useTradeStore.getState().picksA;
    const picksB = useTradeStore.getState().picksB;

    const totalA = picksA.reduce(
      (sum, pick) => sum + (draftPickValues[pick] || 0),
      0
    );
    const totalB = picksB.reduce(
      (sum, pick) => sum + (draftPickValues[pick] || 0),
      0
    );

    saveTrade({
      id: uuidv4(),
      date: new Date().toISOString(),
      teamA,
      teamB,
      picksA,
      picksB,
      valueA: totalA,
      valueB: totalB,
    });

    setSaveModalOpen(true);
  };

  return (
    <>
      <Header />
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Container sx={{ py: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            {/* Team A */}
            <Grid size={{ xs: 12, md: 3 }}>
              <TeamPanel teamLabel="A" />
            </Grid>

            {/* Center Column */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TradeSummary />
              <ValueComparison />
              <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                <Button
                  variant="outlined"
                  sx={{ borderColor: "#8003fC", color: "#8003fC" }}
                  onClick={handleSaveTrade}
                >
                  Save Trade
                </Button>

                <Button
                  variant="outlined"
                  sx={{ borderColor: "#8003fC", color: "#8003fC" }}
                  onClick={() => setShowSaved(true)}
                >
                  View Saved Trades
                </Button>
              </Stack>
            </Grid>

            {/* Team B */}
            <Grid size={{ xs: 12, md: 3 }}>
              <TeamPanel teamLabel="B" />
            </Grid>
          </Grid>

          <SavedTradesModal
            open={showSaved}
            onClose={() => setShowSaved(false)}
            trades={getSavedTrades()}
          />
          <Dialog
            open={saveModalOpen}
            onClose={() => setSaveModalOpen(false)}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>🎉 Trade Saved!</DialogTitle>
            <DialogContent>
              <Typography sx={{ mt: 1 }}>
                Your draft trade has been successfully saved. You can view and
                compare it with previously saved trades.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setSaveModalOpen(false);
                  setShowSaved(true);
                }}
                variant="contained"
                sx={{ backgroundColor: "#8003fC" }}
              >
                View Saved Trades
              </Button>
              <Button
                onClick={() => setSaveModalOpen(false)}
                variant="outlined"
                sx={{ color: "#8003fC" }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Paper>
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 3,
          color: "#888",
          fontSize: "0.875rem",
        }}
      >
        <Typography>
          🏀 DraftTradeIQ &copy; 2025 – Made for the Los Angeles Lakers
        </Typography>
      </Box>
    </>
  );
}

export default App;
