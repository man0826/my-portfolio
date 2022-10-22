import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

type LayoutType = {
  children: React.ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutType) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
