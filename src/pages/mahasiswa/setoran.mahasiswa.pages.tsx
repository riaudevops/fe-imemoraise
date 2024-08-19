import { useTheme } from "../../hooks/useTheme.hooks";
import Layout from "../../components/dashboard/Layout";
import { sidebarMahasiswaItems } from "../../components/dashboard/SidebarItems";
import SetoranMahasiswa from "../../components/dashboard/mahasiswa/SetoranMahasiswa";

const SetoranMahasiswaPages = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <Layout
        setTheme={setTheme}
        currentTheme={theme}
        sidebarItems={sidebarMahasiswaItems}
        subpageTitle="Setoran Mahasiswa"
      >
        <SetoranMahasiswa />
      </Layout>
    </div>
  );
};

export default SetoranMahasiswaPages;
