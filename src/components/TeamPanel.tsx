import React from "react";
import {
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  ListItemIcon,
  ListItemText,
  Box,
  Stack,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useTradeStore } from "../store/tradeStore";
import { nbaTeams } from "../data/nbaTeams";
import { draftPickValues } from "../data/draftValues";

type TeamPanelProps = {
  teamLabel: "A" | "B";
};

const mockTeams = [
  "Los Angeles Lakers",
  "Boston Celtics",
  "Golden State Warriors",
];
const mockDraftPicks = [
  "2024 1st round pick",
  "2025 2nd round pick",
  "2026 1st round pick",
  "2027 2nd round pick",
  "2028 1st round pick",
  "2030 1st round pick",
  "2030 2nd round pick",
];

const TeamPanel: React.FC<TeamPanelProps> = ({ teamLabel }) => {
  const [selectedTeam, setSelectedTeam] = React.useState<string>(mockTeams[0]);
  const [selectedPicks, setSelectedPicks] = React.useState<string[]>([]);

  const isA = teamLabel === "A";
  const team = useTradeStore((s) => (isA ? s.teamA : s.teamB));
  const picks = useTradeStore((s) => (isA ? s.picksA : s.picksB));
  const setTeam = useTradeStore((s) => (isA ? s.setTeamA : s.setTeamB));
  const togglePick = useTradeStore((s) =>
    isA ? s.togglePickA : s.togglePickB
  );

  const highlightColor = teamLabel === "A" ? "#8003fC" : "#FDB927";

  const handlePickToggle = (pick: string) => {
    setSelectedPicks((prev) =>
      prev.includes(pick) ? prev.filter((p) => p !== pick) : [...prev, pick]
    );
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }} elevation={3}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: highlightColor, fontWeight: 600 }}
      >
        Team {teamLabel}
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Team</InputLabel>
        <Select
          value={team}
          label="Team"
          onChange={(e) => setTeam(e.target.value)}
          renderValue={(selected) => {
            const selectedTeam = nbaTeams.find((t) => t.name === selected);
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  src={selectedTeam?.logo}
                  sx={{ width: 24, height: 24 }}
                />
                {selected}
              </Box>
            );
          }}
        >
          {nbaTeams.map(({ name, logo }) => (
            <MenuItem key={name} value={name}>
              <ListItemIcon>
                <Avatar src={logo} sx={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="subtitle1">
        <strong>Draft Picks</strong>
      </Typography>
      <FormGroup sx={{display: "center"}}>
        {mockDraftPicks.map((pick) => (
          <FormControlLabel
            key={pick}
            sx={{
              pl: 1,
              pr: 1,
              borderRadius: 1,
              fontSize: '0.84rem',
              "&:hover": {
                backgroundColor: "action.hover",
              },
              ...(picks.includes(pick) && {
                backgroundColor: "action.selected",
                fontWeight: 500,
              }),
            }}
            control={
              <Checkbox
                checked={picks.includes(pick)}
                onChange={() => togglePick(pick)}
                color="primary"
                sx={{
                  "&.Mui-checked": {
                    color: highlightColor,
                  },
                }}
              />
            }
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmojiEventsIcon
                  fontSize="small"
                  sx={{ color: highlightColor }}
                />
                <Typography>{pick}</Typography>
              </Stack>
            }
          />
        ))}
      </FormGroup>
    </Paper>
  );
};

export default TeamPanel;
