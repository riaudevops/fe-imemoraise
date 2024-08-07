import { useTheme } from "../../hooks/useTheme.hooks";
import DashboardPA from "../../components/dashboard/pa/DashboardPA";

const DashboardPAPages = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <DashboardPA setTheme={setTheme} currentTheme={theme} />
    </div>
  );
};

export default DashboardPAPages;
