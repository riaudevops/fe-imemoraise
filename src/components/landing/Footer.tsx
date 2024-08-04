interface FooterProps {
  isLogin: boolean;
  onLoginClick: () => void;
}

const Footer = ({ isLogin, onLoginClick }: FooterProps) => {
  return (
    <>
      <section className="min-h-screen hero bg-base-100">
        <div className="text-center hero-content">
          <div className="max-w-lg">
            <h1 className="mb-8 text-5xl font-bold">
              Temukan Kemudahan dalam Mengelola Hafalanmu!
            </h1>
            <p className="mb-8 text-xl">
              iMemoraise praktis untuk mengakses laporan hafalanmu kapan saja
              dan di mana saja.
            </p>
            <button className="btn btn-primary" onClick={onLoginClick}>
              {isLogin ? "Lihat Dashboard" : "Memulai Sekarang"}
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
      </section>

      <footer className="p-4 footer footer-center bg-base-100">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            RiauDevOps.
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
