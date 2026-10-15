import InputForm from "../components/dashboard/InputForm";
import { PageShell, PageTitle } from "../components/layout/PageShell";

export default function InputPage({ players, existingRows, onSaved }) {
  return (
    <PageShell maxWidth={640}>
      <PageTitle
        kicker="Input Data Latihan"
        title="Tambah Sesi"
        accent="Shooting"
        sub="Isi masuk dan percobaan per zona. Zona yang tidak dilatih biarkan kosong. Data langsung disimpan ke Google Sheets."
      />
      <InputForm players={players} existingRows={existingRows} onSaved={onSaved} />
    </PageShell>
  );
}
