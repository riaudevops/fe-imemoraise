import { LayoutProps } from "../../interfaces/common.interfaces";
import { Link, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import ThemeSwitcher from "../ThemeSwitcher";
import { useState } from "react";

const Layout = ({
  setTheme,
  currentTheme,
  children,
  sidebarItems,
  subpageTitle,
}: LayoutProps) => {
  const location = useLocation();
  const { keycloak } = useKeycloak();
  const [showModal, setShowModal] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  return (
    <div className="h-full drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="h-full drawer-content">
        <div className="sticky top-0 z-10 flex justify-between h-16 pl-4 border-b shadow-md navbar bg-base-100 border-neutral-content">
          <div className="flex gap-1">
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                ></path>
              </svg>
            </label>
            <span className="text-lg font-semibold">
              <button className="hidden lg:inline btn btn-rounded-sm btn-ghost text-error px-2 p-0 mr-1" onClick={() => window.history.back()}>
                <span className="underline">{"< Kembali"}</span>
              </button>
              <span className="text-sm lg:text-lg">{subpageTitle}</span>
            </span>
          </div>
          <div>
            <ThemeSwitcher setTheme={setTheme} currentTheme={currentTheme} />
            <button
              className="btn btn-ghost text-primary"
              onClick={() => setShowModal(true)}
            >
              <span className="hidden sm:inline">Sign Out</span>
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
            </button>
          </div>
        </div>
        <div className="p-4 bg-base-200/20">{children}</div>
      </div>
      <div className="z-20 drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="h-full p-4 border-r border-black w-80 menu bg-base-100">
          <div className="flex items-center justify-center h-24 mb-3 text-base-100/95">
            <img
              src="/uin-suska.svg"
              alt="UIN Suska Riau"
              className="h-16 mr-2"
            />
            <span className="text-2xl font-bold text-base-content">
              <span className="italic underline">iMemoraise</span> <br /> UIN
              Suska Riau
            </span>
          </div>
          <div className="mx-auto h-[1px] w-48 mb-5 bg-base-content" />
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.link}
                className={`m-2 text-base hover:bg-primary/10 ${
                  location.pathname === item.link ||
                  (location.pathname === "/dosen-pa/mahasiswa/setoran" &&
                    item.label === "Mahasiswa")
                    ? "bg-primary/40"
                    : "bg-base-200"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

			{showModal && (
				<div className="flex justify-center items-center bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 z-50">
					<div className="modal-box lg:ml-10">
						<h2 className="mb-6 text-xl font-bold">
							Logout Confirmation ⚠🥵
						</h2>

            <p className="text-xl">
              Apakah kamu yakin mau logout dari aplikasi iMemoraise inih?
            </p>

            {isLogout && <div className="w-full flex justify-center items-center py-2">
              <span className="loading loading-bars loading-lg"></span>
            </div>}

						<div className="modal-action">
							<button
								className="w-1/2 btn btn-rounded-sm btn-outline btn-error text-lg"
								onClick={() => {
                  setIsLogout(true);
                  keycloak.logout();
								}}
							>
								{isLogout ? (<span>Sedang Logout...</span>) : (<span>Iyah, saya yakin</span>)}
							</button>
							<button
								className="w-1/2 btn btn-rounded-sm btn-warning text-lg"
								onClick={() => {
                  setShowModal(false);
								}}
							>
								Gak jadi deh
							</button>
						</div>
					</div>
				</div>
			)}

    </div>
  );
};

export default Layout;
