import React from "react";
import AddTask from "../components/AddTask";
import GetTask from "../components/GetTask";

const Home = () => {
  return (
    <>
      <div className="container my-5">
        <AddTask />
        <GetTask />
      </div>
    </>
  );
};

export default Home;
