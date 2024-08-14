import { ThemeProps } from "../../../types/common.types";
import { Layout, sidebarMahasiswaItems } from "../Layout";

const SetoranMahasiswa = ({ setTheme, currentTheme }: ThemeProps) => {
  return (
    <Layout
      setTheme={setTheme}
      currentTheme={currentTheme}
      sidebarItems={sidebarMahasiswaItems}
      subpageTitle="Setoran Mahasiswa"
    >
      <h1 className="text-2xl font-bold">Setoran</h1>
    </Layout>
  );
};

export default SetoranMahasiswa;
