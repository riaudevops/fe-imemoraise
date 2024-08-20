import { NavbarProps } from "../../interfaces/common.interfaces";
import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";
import { useState } from "react";

const Navbar = ({
  setTheme,
  currentTheme,
  isLogin,
  onLoginClick,
  onGoToDashboardClick,
}: NavbarProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  
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
          onClick={isLogin ? () => {setShowModal(true)} : onLoginClick}
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
      
      {showModal && (
				<div className="flex justify-center items-center bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0 z-50">
					<div className="modal-box lg:-ml-8">
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
                  onLoginClick();
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

export default Navbar;
