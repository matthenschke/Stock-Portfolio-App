import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Portfolio from "./Portfolio";
import PurchaseForm from "./PurchaseForm";

const Home = () => {
  return (
    <>
      <Navbar />
      <Portfolio />
      <PurchaseForm />
    </>
  );
};

export default Home;
