import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <section>
          <h1 className="text-2xl font-semibold mb-5">Categories</h1>
          <ul className="gap-3 flex flex-col">
            <li className="text-gray-600 cursor-pointer w-fit">All</li>
            <li className="text-gray-600 cursor-pointer w-fit">Office</li>
            <li className="text-gray-600 cursor-pointer w-fit">Living Room</li>
            <li className="text-gray-600 cursor-pointer w-fit">Kitchen</li>
            <li className="text-gray-600 cursor-pointer w-fit">Bedroom</li>
            <li className="text-gray-600 cursor-pointer w-fit">Dining</li>
            <li className="text-gray-600 cursor-pointer w-fit">Kids</li>
          </ul>
        </section>

        <section>
          <h1 className="text-2xl font-semibold my-5">Company</h1>
          <ul className="gap-3 flex flex-col">
            <li className="text-gray-600 cursor-pointer w-fit">All</li>
            <li className="text-gray-600 cursor-pointer w-fit">Marcos</li>
            <li className="text-gray-600 cursor-pointer w-fit">Liddy</li>
            <li className="text-gray-600 cursor-pointer w-fit">Ikea</li>
            <li className="text-gray-600 cursor-pointer w-fit">Caressa</li>
          </ul>
        </section>

        <section>
          <h1 className="text-2xl font-semibold my-5">Price</h1>
          <p className="mb-3">$40.00</p>
          <input type="range" name="" id="" />
        </section>

        <div className="clear-filter mt-7">
          <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
