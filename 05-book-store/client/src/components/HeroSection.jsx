import React from "react";

const HeroSection = () => {
  return (
    <>
      <section
        className="relative bg-cover bg-center text-center text-white py-60"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1681488394409-5614ef55488c?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10">
          <h1 className="text-6xl">Welcome to the Book Store</h1>
          <p className="text-lg mt-4">Discover a world of knowledge</p>
          <button className="mt-6 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 text-white bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 font-medium rounded-xl text-md px-5 py-2.5 text-center me-2 mb-2">
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
