import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../../Components/Navbar/Navbar";

export default function MainLayout({ handleDarkMode, darkMode }) {
  return (
    <>
      <div className="lg:w-10/12 w-full  mx-auto ">
        <NavbarComponent handleDarkMode={handleDarkMode} darkMode={darkMode} />
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
}
