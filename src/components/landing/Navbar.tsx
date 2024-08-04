import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";
import { ThemeProps } from "../../types/main";

interface NavbarProps extends ThemeProps {
  isLogin: boolean;
  onLoginClick: () => void;
}

const Navbar = ({
  setTheme,
  currentTheme,
  isLogin,
  onLoginClick,
}: NavbarProps) => {
  return (
    <div className="fixed z-50 bg-base-100 navbar">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost">
          <img src="/uin-suska.svg" alt="UIN Suska Riau" className="h-8" />
          iMemoraise - UIN Suska Riau
        </Link>
      </div>
      <div className="gap-2">
        <ThemeSwitcher setTheme={setTheme} currentTheme={currentTheme} />
        <button className="btn btn-primary" onClick={onLoginClick}>
          <span className="hidden sm:inline">
            {isLogin ? "Lihat Dashboard" : "Sign In"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 transform -rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
