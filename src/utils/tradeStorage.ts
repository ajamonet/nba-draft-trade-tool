import { TradeRecord } from "../types/trade";

const STORAGE_KEY = "savedTrades";

export const saveTrade = (trade: TradeRecord) => {
  const existing = getSavedTrades();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, trade]));
};

export const getSavedTrades = (): TradeRecord[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const clearTrades = () => {
  localStorage.removeItem(STORAGE_KEY);
};
