const API_KEY  = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_SHEET_ID;

const TAB_PLAYERS  = "players";
const TAB_SHOOTING = "shooting_data";
const TAB_RUNNING  = "running_data";

async function fetchSheetValues(tabName) {
  const range = encodeURIComponent(`${tabName}!A:Z`);
  const url   = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  const res   = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Sheets API [${tabName}]: ${err.error?.message || res.status}`);
  }
  const data = await res.json();
  return data.values || [];
}

function rowsToObjects(rows) {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  return rows
    .slice(1)
    .map((row) => {
      const obj = {};
      headers.forEach((h, i) => {
        const raw = row[i] ?? "";
        // Angka bulat (tanpa koma/titik dua) langsung convert ke number
        // String seperti "5,01" atau "5:35" dibiarkan string — diparse di statHelpers
        obj[h] = (raw !== "" && !isNaN(raw) && !String(raw).includes(",") && !String(raw).includes(":"))
          ? Number(raw)
          : raw;
      });
      return obj;
    })
    // Buang baris kosong — baris valid harus punya kolom pertama berisi
    .filter((row) => {
      const firstKey = headers[0];
      return row[firstKey] !== "" && row[firstKey] !== undefined && row[firstKey] !== null;
    });
}

export async function fetchPlayersData()  {
  return rowsToObjects(await fetchSheetValues(TAB_PLAYERS));
}
export async function fetchShootingData() {
  return rowsToObjects(await fetchSheetValues(TAB_SHOOTING));
}
export async function fetchRunningData()  {
  return rowsToObjects(await fetchSheetValues(TAB_RUNNING));
}