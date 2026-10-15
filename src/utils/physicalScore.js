// Skor tes fisik 0–100. Semua patokan dibaca dari tab physical_benchmark.

// skor = (nilai - skor_0) / (skor_100 - skor_0) * 100, di-clamp 0–100.
// Untuk lower_better otomatis benar karena skor_0 > skor_100.
export function scoreFor(bench, value) {
  if (value === null || value === undefined) return null;
  const raw = ((value - bench.nilai_skor_0) / (bench.nilai_skor_100 - bench.nilai_skor_0)) * 100;
  return Math.round(Math.min(100, Math.max(0, raw)));
}

// Urutan sumbu mengikuti urutan pertama muncul di sheet benchmark
export function radarAxes(benchmarks) {
  return [...new Set(benchmarks.map((b) => b.sumbu_radar).filter(Boolean))];
}

// Sumbu = rata-rata skor semua test_key dengan sumbu_radar yang sama (yang ada nilainya saja)
export function axisScores(row, benchmarks) {
  const out = {};
  radarAxes(benchmarks).forEach((axis) => {
    const scores = benchmarks
      .filter((b) => b.sumbu_radar === axis)
      .map((b) => scoreFor(b, row?.[b.test_key]))
      .filter((s) => s !== null);
    out[axis] = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  });
  return out;
}

function hasAnyTest(row, benchmarks) {
  return benchmarks.some((b) => row[b.test_key] !== null && row[b.test_key] !== undefined);
}

// Satu baris per putaran untuk satu pemain, urut putaran.
// Kalau ada baris dobel di putaran yang sama, nilai yang terisi belakangan menimpa.
export function playerRounds(physical, playerId) {
  const byRound = new Map();
  physical
    .filter((r) => r.player_id === playerId)
    .forEach((r) => {
      const prev = byRound.get(r.test_round) || {};
      const merged = { ...prev };
      Object.entries(r).forEach(([k, v]) => { if (v !== null && v !== "") merged[k] = v; });
      byRound.set(r.test_round, merged);
    });
  return [...byRound.values()].sort((a, b) => a.test_round - b.test_round);
}

// Tes awal = putaran paling awal yang punya data, tes terbaru = putaran paling akhir
export function initialAndLatest(rounds, benchmarks) {
  const withData = rounds.filter((r) => hasAnyTest(r, benchmarks));
  if (!withData.length) return { initial: null, latest: null };
  const initial = withData[0];
  const latest  = withData[withData.length - 1];
  return { initial, latest: latest === initial ? null : latest };
}

// Selisih nilai mentah per tes: nilai terbaru dikurangi nilai paling awal yang ada
export function testDeltas(rounds, benchmarks) {
  return benchmarks.map((b) => {
    const vals = rounds.filter((r) => r[b.test_key] !== null && r[b.test_key] !== undefined);
    if (vals.length < 2) {
      return { bench: b, delta: null, first: vals[0] || null, last: null };
    }
    const first = vals[0];
    const last  = vals[vals.length - 1];
    const delta = Math.round((last[b.test_key] - first[b.test_key]) * 100) / 100;
    const improved = delta === 0 ? null : (b.arah === "lower_better" ? delta < 0 : delta > 0);
    return { bench: b, delta, first, last, improved };
  });
}

// Rata-rata tim per putaran untuk satu tes (pemain aktif saja, sel kosong tidak dihitung)
export function teamAverageByRound(physical, activeIds, testKey) {
  const sums = new Map();
  const seen = new Set();
  // Baris dobel pemain+putaran dihitung sekali (pakai yang terakhir terisi)
  [...physical].reverse().forEach((r) => {
    const v = r[testKey];
    if (!activeIds.has(r.player_id) || v === null || v === undefined) return;
    const k = `${r.player_id}|${r.test_round}`;
    if (seen.has(k)) return;
    seen.add(k);
    const s = sums.get(r.test_round) || { total: 0, n: 0 };
    s.total += v; s.n += 1;
    sums.set(r.test_round, s);
  });
  const out = {};
  sums.forEach((s, round) => { out[round] = Math.round((s.total / s.n) * 100) / 100; });
  return out;
}

// Singkatan satuan untuk tampilan
export function unitShort(satuan) {
  const s = (satuan || "").toLowerCase();
  if (s === "detik") return "dtk";
  if (s === "meter") return "m";
  return satuan || "";
}
