interface HeroProps {
  isLogin: boolean;
  onLoginClick: () => void;
}

const Hero = ({ isLogin, onLoginClick }: HeroProps) => {
  return (
    <div className="min-h-screen pt-16 hero bg-base-100">
      <div className="flex-col hero-content">
        <div className="flex flex-col items-center max-w-md">
          <img
            src="/kaligrafi.svg"
            alt="UIN Suska Riau"
            className="w-56 h-56 mb-8"
          />
          <h1 className="text-5xl font-bold">iMemoraise</h1>
          <p className="py-6">
            Integrated Quran Memorization Information System
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
    </div>
  );
};

export default Hero;
