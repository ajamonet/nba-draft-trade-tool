# ⚙️ Implementation Overview

This app was built with:

- React + TypeScript
- MUI (Material UI) for styling and layout
- Zustand for state management
- LocalStorage to persist saved trades
- Draft pick value logic based on [nbasense.com ESPN chart](http://nbasense.com/draft-pick-trade-value/compare-charts)

### Core Functionality

- Choose two random NBA teams and compare draft picks
- Value difference calculated automatically by trade evaluator
- Value comparison is marked by a bar + verdict chip
- Users can save and load trade scenarios within a modal
- Long-term storage (localStorage) used to store saved trades

### Deployed Application 
- [NBA Trade](https://nba-draft-trade-tool.vercel.app/)

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
