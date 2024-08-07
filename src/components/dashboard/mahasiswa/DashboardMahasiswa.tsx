import { ThemeProps } from "../../../types/common.types";
import { Layout, sidebarMahasiswaItems } from "../Layout";

const DashboardMahasiswa = ({ setTheme, currentTheme }: ThemeProps) => {
  return (
    <Layout
      setTheme={setTheme}
      currentTheme={currentTheme}
      sidebarItems={sidebarMahasiswaItems}
    >
      <h1 className="text-2xl font-bold">Dashboard Mahasiswa</h1>
    </Layout>
  );
};

export default DashboardMahasiswa;
