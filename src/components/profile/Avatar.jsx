import { useState } from "react";
import { C, FONT_HEAD } from "../../theme";

function isUrl(s) {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function initials(name) {
  return (name || "?").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// pas_foto bukan URL valid (misal "x") atau gagal dimuat → avatar inisial
export default function Avatar({ name, src, size = 72 }) {
  const [failed, setFailed] = useState(false);
  const base = {
    width: size, height: size, borderRadius: "50%", flexShrink: 0,
    border: `2px solid ${C.white}`,
  };
  if (isUrl(src) && !failed) {
    return <img src={src} alt={name} onError={() => setFailed(true)} style={{ ...base, objectFit: "cover", background: C.line }} />;
  }
  return (
    <div aria-label={name} style={{
      ...base, background: C.white, color: C.brand, display: "flex",
      alignItems: "center", justifyContent: "center", fontFamily: FONT_HEAD,
      fontWeight: 900, fontSize: size * 0.4,
    }}>
      {initials(name)}
    </div>
  );
}
