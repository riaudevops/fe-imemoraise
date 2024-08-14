import { Layout, sidebarPAItems } from "../Layout";
import { ThemeProps } from "../../../types/common.types";

const DashboardPA = ({ setTheme, currentTheme }: ThemeProps) => {
  return (
    <Layout
      setTheme={setTheme}
      currentTheme={currentTheme}
      sidebarItems={sidebarPAItems}
      subpageTitle="Dashboard PA"
    >
      <h1 className="text-2xl font-bold">Dashboard PA</h1>
    </Layout>
  );
};

export default DashboardPA;
