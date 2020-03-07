import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Portfolio from "./Portfolio";
import PurchaseForm from "./PurchaseForm";
import auth from "../auth";

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
