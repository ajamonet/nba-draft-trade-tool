import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack
} from '@mui/material';
import { useState } from 'react';
import { useTradeStore } from '../store/tradeStore';

function Header() {
  const [helpOpen, setHelpOpen] = useState(false);

  const resetTrade = () => {
    useTradeStore.setState({
      teamA: 'Los Angeles Lakers',
      teamB: 'Boston Celtics',
      picksA: [],
      picksB: [],
    });
  };

  const openSavedTrades = () => {
    window.dispatchEvent(new Event('open-saved-trades'));
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: "#643794" }}>
          <Typography variant="h6">NBA Draft TradeIQ</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={resetTrade}>
              New Trade
            </Button>
            <Button color="inherit" onClick={openSavedTrades}>
              Saved Trades
            </Button>
            <Button color="inherit" onClick={() => setHelpOpen(true)}>
              Help
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={helpOpen} onClose={() => setHelpOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>How to Use</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Typography>📋 Select two NBA teams from the dropdown menus.</Typography>
            <Typography>✅ Choose the draft picks each team will trade.</Typography>
            <Typography>📊 View the value comparison and verdict.</Typography>
            <Typography>💾 Save trade concepts to compare them later.</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHelpOpen(false)} variant="contained" color="primary">
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
