import { ReactNode } from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import { Link, useLocation } from "react-router-dom";
import { ThemeProps } from "../../types/common.types";

interface LayoutProps extends ThemeProps {
  children: ReactNode;
  sidebarItems: Array<{
    icon: ReactNode;
    label: string;
    link: string;
  }>;
}

const Layout = ({
  setTheme,
  currentTheme,
  children,
  sidebarItems,
}: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="shadow-md navbar bg-base-100">
          <div className="flex-1">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                ></path>
              </svg>
            </label>
          </div>
          <ThemeSwitcher setTheme={setTheme} currentTheme={currentTheme} />
          <button className="btn btn-ghost text-primary">
            <span className="hidden sm:inline">Sign Out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
          </button>
        </div>

        <div className="h-screen p-4 bg-base-200/50">{children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="h-full p-4 w-80 menu bg-primary">
          <div className="flex items-center justify-center h-24 mb-8 text-base-100/95">
            <img
              src="/uin-suska.svg"
              alt="UIN Suska Riau"
              className="w-16 h-16 mr-2"
            />
            <span className="text-2xl font-bold">
              iMemoraise <br /> UIN Suska Riau
            </span>
          </div>
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className={`m-2 text-base hover:bg-base-100/90 ${
                  location.pathname === item.link
                    ? "bg-base-100/90"
                    : "bg-base-100/50"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const sidebarMahasiswaItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mx-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
    label: "Dashboard",
    link: "/mahasiswa",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mx-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    ),
    label: "Setoran",
    link: "/mahasiswa/setoran",
  },
];

const sidebarPAItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mx-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
    label: "Dashboard",
    link: "/pa",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mx-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
    label: "Mahasiswa",
    link: "/pa/mahasiswa",
  },
];

export { Layout, sidebarPAItems, sidebarMahasiswaItems };
