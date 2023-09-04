import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const activeLink =
    "text-yellow-500 p-1 block hover:bg-yellow-500 hover:text-gray-900";
  const complement =
    "p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900";
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          INSHELL Restaurant
        </p>
        <p className="text-gray-500 m-3">Manage your restaurant:</p>

        <nav className="mt-10">
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : complement)}
            to="/"
          >
            Orders
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : complement)}
            to="/menu"
          >
            Menu
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
