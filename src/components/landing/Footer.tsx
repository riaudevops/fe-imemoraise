const Footer = () => {
  return (
    <footer className="p-8 footer footer-center bg-base-200/50">
      <aside>
        <p>
          <span className="text-lg font-bold">iMemoraise - UIN Suska Riau</span>
          <br />
          <span className="italic font-semibold underline">
            Integrated Quran Memorization Information System
          </span>
        </p>
        <p>
          Copyright © {new Date().getFullYear()} - Proudly created by{" "}
          <a
            href="https://www.instagram.com/riaudevops"
            target="_blank"
            className="underline"
          >
            RiauDevOps
          </a>{" "}
          <span> x </span>
          <a
            href="https://www.instagram.com/alisi.usr"
            target="_blank"
            className="underline"
          >
            Alisi-USR
          </a>{" "}
          Team with ❤️
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
