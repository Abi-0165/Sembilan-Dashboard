// Data CONTOH tab physical_test — hanya untuk uji lokal, bukan data asli.
// Aktif kalau VITE_USE_MOCK_PHYSICAL=true. Format sama seperti baris dari sheet
// (angka bisa number atau string berkoma "3,52", sel kosong = tidak ikut tes).
export const PHYSICAL_MOCK = [
  { test_round: 1, test_date: "2026-10-20", player_id: 1, player_name: "Raka",
    yoyo_level: 15, yoyo_shuttle: 2, yoyo_jarak_m: 720, sprint_20m_detik: "3,52", lane_agility_detik: 12.6,
    vertical_jump_cm: 42, pushup_1menit_reps: 28, plank_detik: 75, tinggi_cm: 172, berat_kg: 61, catatan: "" },
  { test_round: 2, test_date: "2026-12-15", player_id: 1, player_name: "Raka",
    yoyo_level: 16, yoyo_shuttle: 4, yoyo_jarak_m: 920, sprint_20m_detik: "3,41", lane_agility_detik: 12.1,
    vertical_jump_cm: 45, pushup_1menit_reps: 33, plank_detik: 95, tinggi_cm: 173, berat_kg: 62, catatan: "" },
  { test_round: 3, test_date: "2027-03-28", player_id: 1, player_name: "Raka",
    yoyo_level: 17, yoyo_shuttle: 3, yoyo_jarak_m: 1120, sprint_20m_detik: "3,37", lane_agility_detik: "",
    vertical_jump_cm: 48, pushup_1menit_reps: 36, plank_detik: "", tinggi_cm: 173, berat_kg: 63, catatan: "Lane agility & plank tidak ikut (cedera ringan)" },
  { test_round: 1, test_date: "2026-10-20", player_id: 2, player_name: "Adit",
    yoyo_level: 14, yoyo_shuttle: 6, yoyo_jarak_m: 600, sprint_20m_detik: 3.6, lane_agility_detik: 13.1,
    vertical_jump_cm: 38, pushup_1menit_reps: 22, plank_detik: 60, tinggi_cm: 168, berat_kg: 58, catatan: "" },
  { test_round: 2, test_date: "2026-12-15", player_id: 2, player_name: "Adit",
    yoyo_level: 15, yoyo_shuttle: 5, yoyo_jarak_m: 800, sprint_20m_detik: 3.48, lane_agility_detik: 12.8,
    vertical_jump_cm: 41, pushup_1menit_reps: 27, plank_detik: 80, tinggi_cm: 169, berat_kg: 59, catatan: "" },
  { test_round: 1, test_date: "2026-10-20", player_id: 3, player_name: "Aldo",
    yoyo_level: 16, yoyo_shuttle: 1, yoyo_jarak_m: 840, sprint_20m_detik: 3.3, lane_agility_detik: 11.9,
    vertical_jump_cm: 50, pushup_1menit_reps: "", plank_detik: 110, tinggi_cm: 178, berat_kg: 66, catatan: "Push-up tidak ikut" },
];
