const Footer = () => {
  return (
    <footer className="p-8 footer footer-center bg-base-200/50">
      <aside>
        <p className="font-bold">
          iMemoraise
          <br />
          Integrated Quran Memorization Information System
        </p>
        <p>
          Copyright © {new Date().getFullYear()} - Proudly created by{" "}
          <a
            href="https://www.github.com/riaudevops"
            target="_blank"
            className="underline"
          >
            Riau DevOps
          </a>{" "}
          Team with ❤️
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
