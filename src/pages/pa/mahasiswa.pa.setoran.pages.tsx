import { useTheme } from "../../hooks/useTheme.hooks";
import MahasiswaPASetoran from "../../components/dashboard/pa/MahasiswaPASetoran";

const MahasiswaPASetoranPages = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-theme={theme}>
      <MahasiswaPASetoran setTheme={setTheme} currentTheme={theme} />
    </div>
  );
};

export default MahasiswaPASetoranPages;
