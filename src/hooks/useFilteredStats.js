import { useMemo } from "react";
import { ZONES, getPct, parseNum, parsePace } from "../utils/statHelpers";

export function useFilteredStats({ shootingData, runningData, selectedPlayer, dateFrom, dateTo }) {
  const filteredShooting = useMemo(() => {
    return (shootingData || []).filter((d) => {
      const matchPlayer = selectedPlayer === "ALL" || String(d.player_id) === String(selectedPlayer);
      const matchDate   = d.date >= dateFrom && d.date <= dateTo;
      return matchPlayer && matchDate;
    });
  }, [shootingData, selectedPlayer, dateFrom, dateTo]);

  const filteredRunning = useMemo(() => {
    return (runningData || []).filter((d) => {
      const matchPlayer = selectedPlayer === "ALL" || String(d.player_id) === String(selectedPlayer);
      const matchDate   = d.date >= dateFrom && d.date <= dateTo;
      return matchPlayer && matchDate;
    });
  }, [runningData, selectedPlayer, dateFrom, dateTo]);

  const zoneData = useMemo(() => {
    const agg = {};
    ZONES.forEach((z) => { agg[z.key] = { made: 0, attempt: 0 }; });
    filteredShooting.forEach((d) => {
      ZONES.forEach((z) => {
        agg[z.key].made    += Number(d[z.made])    || 0;
        agg[z.key].attempt += Number(d[z.attempt]) || 0;
      });
    });
    return agg;
  }, [filteredShooting]);

  const summary = useMemo(() => {
    const totalShots = ZONES.reduce((s, z) => s + (zoneData[z.key].attempt || 0), 0);
    const totalMade  = ZONES.reduce((s, z) => s + (zoneData[z.key].made    || 0), 0);
    const totalKm    = filteredRunning.reduce((s, d) => s + parseNum(d.jarak_km), 0);
    const avgPace    = filteredRunning.length
      ? (filteredRunning.reduce((s, d) => s + parsePace(d.pace_min_per_km), 0) / filteredRunning.length)
      : null;

    const formatPace = (decimal) => {
      if (!decimal) return "—";
      const min = Math.floor(decimal);
      const sec = Math.round((decimal - min) * 60);
      return `${min}:${String(sec).padStart(2, "0")}`;
    };

    return {
      overallPct:   getPct(totalMade, totalShots),
      totalShots,
      totalMade,
      totalKm:      totalKm.toFixed(1),
      avgPace:      formatPace(avgPace),
      sessionCount: filteredShooting.length + filteredRunning.length,
    };
  }, [zoneData, filteredRunning, filteredShooting]);

  return { filteredShooting, filteredRunning, zoneData, summary };
}