import { useTheme } from "../../hooks/useTheme.hooks";
import Layout from "../../components/dashboard/Layout";
import { sidebarPAItems } from "../../components/dashboard/SidebarItems";
import MahasiswaPA from "../../components/dashboard/pa/MahasiswaPA";

const MahasiswaPAPages = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <Layout
        setTheme={setTheme}
        currentTheme={theme}
        sidebarItems={sidebarPAItems}
        subpageTitle="Mahasiswa Bimbingan Akademik"
      >
        <MahasiswaPA />
      </Layout>
    </div>
  );
};

export default MahasiswaPAPages;
