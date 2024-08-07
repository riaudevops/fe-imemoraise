import { useTheme } from "../../hooks/useTheme.hooks";
import MahasiswaPA from "../../components/dashboard/pa/MahasiswaPA";

const MahasiswaPAPages = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <MahasiswaPA setTheme={setTheme} currentTheme={theme} />
    </div>
  );
};

export default MahasiswaPAPages;
