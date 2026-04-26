import { useState, useEffect } from "react";
import { fetchPlayersData, fetchShootingData, fetchRunningData } from "../utils/parseSheetData";
import { PLAYERS }       from "../data/players";
import { SHOOTING_DATA } from "../data/shootingData";
import { RUNNING_DATA }  from "../data/runningData";

export function useSheetData() {
  const [players,      setPlayers]      = useState(PLAYERS);
  const [shootingData, setShootingData] = useState(SHOOTING_DATA);
  const [runningData,  setRunningData]  = useState(RUNNING_DATA);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [p, s, r] = await Promise.all([
          fetchPlayersData(),
          fetchShootingData(),
          fetchRunningData(),
        ]);
        if (p.length > 0) setPlayers(p);
        if (s.length > 0) setShootingData(s);
        if (r.length > 0) setRunningData(r);
      } catch (err) {
        console.warn("Sheets fetch gagal, pakai dummy:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { players, shootingData, runningData, loading, error };
}