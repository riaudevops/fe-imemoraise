import { Link } from "react-router-dom";
import ThemeSwitcher from "../ThemeSwitcher";
import { ThemeProps } from "../../types/common.types";

interface NavbarProps extends ThemeProps {
	isLogin: boolean;
	onLoginClick: () => void;
	onGoToDashboardClick: () => void;
}

const Navbar = ({
	setTheme,
	currentTheme,
	isLogin,
	onLoginClick,
	onGoToDashboardClick,
}: NavbarProps) => {
	return (
		<div className="fixed z-10 shadow-sm bg-base-100/95 navbar">
			<div className="flex-1">
				<Link to="/" className="btn btn-ghost">
					<img src="/uin-suska.svg" alt="UIN Suska Riau" className="h-8" />
					<span>iMemoraise - UIN Suska Riau</span>
				</Link>
			</div>
			<div className="flex gap-2">
				<ThemeSwitcher setTheme={setTheme} currentTheme={currentTheme} />
				{isLogin && (
					<button
						className="btn btn-outline btn-base hidden sm:flex"
						onClick={onGoToDashboardClick}
					>
						<span>Pergi ke Dashboard</span>
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
					) : (
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
					)}
				</button>
			</div>
		</div>
	);
};

export default Navbar;
