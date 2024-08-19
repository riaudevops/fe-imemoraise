import { useTheme } from "../../hooks/useTheme.hooks";
import Layout from "../../components/dashboard/Layout";
import { sidebarPAItems } from "../../components/dashboard/SidebarItems";
import DashboardPA from "../../components/dashboard/pa/DashboardPA";

const DashboardPAPages = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <Layout
        setTheme={setTheme}
        currentTheme={theme}
        sidebarItems={sidebarPAItems}
        subpageTitle="Dashboard PA"
      >
        <DashboardPA />
      </Layout>
    </div>
  );
};

export default DashboardPAPages;
