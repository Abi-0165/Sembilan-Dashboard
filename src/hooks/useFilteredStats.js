import { useMemo } from "react";
import { ZONES, getPct, aggregateZones } from "../utils/statHelpers";

// activeIds: Set player_id dengan status "aktif" — pemain lain tidak dihitung
export function useFilteredStats({ shootingData, activeIds, selectedPlayer, dateFrom, dateTo }) {
  const filteredShooting = useMemo(() => {
    return (shootingData || []).filter((d) => {
      if (!activeIds.has(d.player_id)) return false;
      const matchPlayer = selectedPlayer === "ALL" || String(d.player_id) === String(selectedPlayer);
      const matchDate   = d.date >= dateFrom && d.date <= dateTo;
      return matchPlayer && matchDate;
    });
  }, [shootingData, activeIds, selectedPlayer, dateFrom, dateTo]);

  const zoneData = useMemo(() => aggregateZones(filteredShooting), [filteredShooting]);

  const summary = useMemo(() => {
    const totalShots = ZONES.reduce((s, z) => s + zoneData[z.key].attempt, 0);
    const totalMade  = ZONES.reduce((s, z) => s + zoneData[z.key].made, 0);
    const zonePcts = ZONES
      .map((z) => ({ label: z.label, pct: getPct(zoneData[z.key].made, zoneData[z.key].attempt) }))
      .filter((z) => z.pct !== null);
    const best = zonePcts.length ? zonePcts.reduce((a, b) => (b.pct > a.pct ? b : a)) : null;
    return {
      overallPct:   getPct(totalMade, totalShots),
      totalShots,
      totalMade,
      sessionCount: filteredShooting.length,
      bestZone:     best,
    };
  }, [zoneData, filteredShooting]);

  return { filteredShooting, zoneData, summary };
}
