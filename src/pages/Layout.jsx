import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Layout = () => {
   return (
      <>
         <Navbar />
         <Outlet />
         <footer className="fixed-bottom bg-light text-center">
            FullStack QnA &copy; {new Date().getFullYear()}
         </footer>
      </>
   )
};

export default Layout;