import { NavbarProps } from "../../interfaces/common.interfaces";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";

const Navbar = ({
  setTheme,
  currentTheme,
  isLogin,
  onLoginClick,
  onGoToDashboardClick,
}: NavbarProps) => {
  return (
    <div className="fixed z-10 flex justify-between shadow-sm bg-base-100/95 navbar">
      <div>
        <Link to="/" className="btn btn-ghost">
          <img src="/uin-suska.svg" alt="UIN Suska Riau" className="h-8" />
          <span>iMemoraise - UIN Suska Riau</span>
        </Link>
      </div>
      <div className="flex gap-2 pr-1">
        <ThemeSwitcher setTheme={setTheme} currentTheme={currentTheme} />
        {isLogin && (
          <button
            className="hidden btn btn-outline sm:flex"
            onClick={onGoToDashboardClick}
          >
            <span>Pergi ke Dashboard</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 transform -rotate-45"
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
        )}
        <button
          className={`btn ${isLogin ? "btn-error" : "btn-primary"}`}
          onClick={onLoginClick}
        >
          <span className="hidden sm:inline">
            {isLogin ? "Sign Out" : "Sign In"}
          </span>
          {isLogin ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 transform -rotate-45"
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
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
