import React from "react";
import NavbarFile from "../Components/NavbarFile";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

function Layout() {
  return (
    <>
      <NavbarFile />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
