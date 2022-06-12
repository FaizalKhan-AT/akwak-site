import React from "react";
import Banner from "../Components/Banner/Banner";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

function Home() {
  return (
    <>
      <div className="home">
        <Navbar />
        <Banner />
        <Footer />
      </div>
    </>
  );
}

export default Home;
