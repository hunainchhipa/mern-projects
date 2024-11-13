import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Products from "../components/Products";
import UploadBook from "../components/UploadBook";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <Products />
      <UploadBook />
    </>
  );
};

export default Home;
