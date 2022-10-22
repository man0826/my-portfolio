import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <h1 className="fixed top-6 md:top-8 left-6 md:left-12 z-50">
        <Link href="/">
          <a className="inline-block w-8 md:w-9 h-8 md:h-9 transition-all duration-300 hover:opacity-60">
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              width="50"
              height="50"
            />
          </a>
        </Link>
      </h1>
    </header>
  );
};

export default Header;
