import { useTheme } from "../../hooks/useTheme.hooks";
import Layout from "../../components/dashboard/Layout";
import { sidebarPAItems } from "../../components/dashboard/SidebarItems";
import MahasiswaPASetoran from "../../components/dashboard/pa/MahasiswaPASetoran";

const MahasiswaPASetoranPages = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <Layout
        setTheme={setTheme}
        currentTheme={theme}
        sidebarItems={sidebarPAItems}
        subpageTitle="Detail Setoran Mahasiswa"
      >
        <MahasiswaPASetoran />
      </Layout>
    </div>
  );
};

export default MahasiswaPASetoranPages;
