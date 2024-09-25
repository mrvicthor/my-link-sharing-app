import React from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};

export default Layout;
