import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  title = "Info App",
  description = "MERN stack project",
  keyword = "mern, react, node, mongodb",
  author = "Prateekinfoyt",
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main
        style={{
          minHeight: "calc(100vh - 120px)", // header + footer
          width: "100%",
          display: "block",
        }}
      >
        <Toaster position="top-right" />
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Layout;
