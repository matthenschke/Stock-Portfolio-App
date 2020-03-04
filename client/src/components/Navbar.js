import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="text-right mr-5">
      <nav>
        <NavLink to="/home">Portfolio</NavLink>
        <span> | </span>
        <NavLink to="/transactions">Transactions</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
