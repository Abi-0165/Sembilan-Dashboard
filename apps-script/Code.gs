/**
 * Apps Script untuk form input shooting — Sembilan Basketball.
 *
 * Satu-satunya tab yang ditulis web: shooting_data.
 * Baris di-append sesuai urutan header baris 1 (bukan posisi tetap), jadi kolom
 * baru di sheet tidak merusak penyimpanan.
 *
 * Deploy: Extensions → Apps Script di spreadsheet database-dashbooard-sembilan,
 * tempel file ini, lalu Deploy → Manage deployments → Edit → Version: New version.
 * Execute as: Me · Who has access: Anyone.
 */

const SHEET_NAME = "shooting_data";
const ZONES = ["corner_kiri", "wing_kiri", "top", "wing_kanan", "corner_kanan"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse(e.postData.contents);
    const row = buildRecord_(data);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Tab " + SHEET_NAME + " tidak ditemukan");

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      .map(function (h) { return String(h).trim().toLowerCase().replace(/\s+/g, "_"); });
    const values = headers.map(function (h) { return h in row ? row[h] : ""; });

    sheet.appendRow(values);

    // Kolom date disimpan sebagai tanggal asli dengan format yyyy-mm-dd (sama seperti baris lama)
    const dateCol = headers.indexOf("date");
    if (dateCol >= 0) sheet.getRange(sheet.getLastRow(), dateCol + 1).setNumberFormat("yyyy-mm-dd");

    return json_({ ok: true, row: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

// Validasi ulang di server — jangan percaya input dari browser begitu saja
function buildRecord_(d) {
  const m = String(d.date || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) throw new Error("Format tanggal harus yyyy-mm-dd");
  const playerId = Number(d.player_id);
  if (!Number.isInteger(playerId)) throw new Error("player_id tidak valid");
  if (!d.player_name) throw new Error("player_name kosong");

  const rec = {
    date: new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])),
    player_id: playerId,
    player_name: String(d.player_name),
  };
  let anyZone = false;
  ZONES.forEach(function (z) {
    const made = Number(d[z + "_masuk"]);
    const att  = Number(d[z + "_percobaan"]);
    if (!Number.isInteger(made) || made < 0 || !Number.isInteger(att) || att < 0) {
      throw new Error(z + ": harus bilangan bulat ≥ 0");
    }
    if (made > att) throw new Error(z + ": masuk lebih besar dari percobaan");
    if (att > 0) anyZone = true;
    rec[z + "_masuk"] = made;
    rec[z + "_percobaan"] = att;
  });
  if (!anyZone) throw new Error("Minimal satu zona harus terisi");
  return rec;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
