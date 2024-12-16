import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="bg-sky-700 text-white py-5">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl cursor-pointer">LIBRARY</div>
          <nav>
            <ul className="flex space-x-5">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#books">Books</a>
              </li>
              <li>
                <a href="#upload-book">Upload Book</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
