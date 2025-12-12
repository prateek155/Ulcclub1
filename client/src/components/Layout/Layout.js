import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({
  children,
  title = "Info app ",
  description = "mern stack project",
  keyword = "mern,react,node,mongodb",
  author = "Prateekinfoyt"
}) => {
  return (
    // Top-level full-bleed container:
    <div
      style={{
        backgroundColor: "#0a0a0a",           // app background = dark
        color: "#ffffff",
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        // Reserve the device safe-area on top (notched phones / webviews)
        paddingTop: "env(safe-area-inset-top, 12px)",
        // Ensure we don't get horizontal overflow caused by 100vw quirks
        maxWidth: "100%",
        overflowX: "hidden",
      }}
      className="main-container"
    >
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keyword" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      {/* Header + content */}
      <Header />

      <main style={{ minHeight: "70vh", width: "100%", margin: 0, padding: 0 }}>
        <Toaster />
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
