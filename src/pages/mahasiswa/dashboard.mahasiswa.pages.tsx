import { useTheme } from "../../hooks/useTheme.hooks";
import DashboardMahasiswa from "../../components/dashboard/mahasiswa/DashboardMahasiswa";

const DashboardMahasiswaPages = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <DashboardMahasiswa setTheme={setTheme} currentTheme={theme} />
    </div>
  );
};

export default DashboardMahasiswaPages;
