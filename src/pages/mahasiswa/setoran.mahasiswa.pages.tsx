import { useTheme } from "../../hooks/useTheme.hooks";
import SetoranMahasiswa from "../../components/dashboard/mahasiswa/SetoranMahasiswa";

const SetoranMahasiswaPages = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <SetoranMahasiswa setTheme={setTheme} currentTheme={theme} />
    </div>
  );
};

export default SetoranMahasiswaPages;
