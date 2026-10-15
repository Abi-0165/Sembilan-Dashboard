import { useState, useEffect, useCallback } from "react";
import {
  fetchAllTabs, normalizePlayers, normalizeShooting, normalizePhysical,
  normalizeSchedule, normalizeBenchmark,
} from "../utils/sheets";
import { PLAYERS }       from "../data/players";
import { SHOOTING_DATA } from "../data/shootingData";
import { PHYSICAL_MOCK } from "../data/physicalMock";

// Mock tes fisik hanya untuk uji lokal — set VITE_USE_MOCK_PHYSICAL=true di .env.local
const USE_MOCK_PHYSICAL = import.meta.env.VITE_USE_MOCK_PHYSICAL === "true";

const FALLBACK_SHOOTING = normalizeShooting(SHOOTING_DATA);

async function fetchParsed() {
  const tabs = await fetchAllTabs();
  const shooting = normalizeShooting(tabs.shooting);
  return {
    players:      normalizePlayers(tabs.players),
    shootingData: shooting.valid,
    shootingAll:  shooting.all,
    physical:     normalizePhysical(USE_MOCK_PHYSICAL ? PHYSICAL_MOCK : tabs.physical),
    schedule:     normalizeSchedule(tabs.schedule),
    benchmarks:   normalizeBenchmark(tabs.benchmark),
  };
}

export function useSheetData() {
  const [data, setData] = useState({
    players:      PLAYERS,
    shootingData: FALLBACK_SHOOTING.valid,
    shootingAll:  FALLBACK_SHOOTING.all,
    physical:     [],
    schedule:     [],
    benchmarks:   [],
  });
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const load = useCallback(() => {
    return fetchParsed()
      .then((next) => {
        setData((prev) => ({ ...next, players: next.players.length ? next.players : prev.players }));
        setError(null);
      })
      .catch((err) => {
        console.warn("Sheets fetch gagal, pakai data lokal:", err.message);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  // reload() tidak memunculkan spinner penuh — dipakai setelah submit form
  return { ...data, loading, error, reload: load };
}
