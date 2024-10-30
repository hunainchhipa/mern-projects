import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error?.response?.data?.msg);
      });
  }, []);

  return (
    <>
      <div className="min-h-svh flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">{data?.msg}</h1>
        <h1 className="text-3xl mt-5 text-green-900">{data?.secret}</h1>

        {error && (
          <>
            <h1 className="text-3xl text-red-800">
              {error}, <br />
            </h1>
            <h1 className="text-3xl text-red-800">Please Login!!!</h1>
          </>
        )}

        <button
          className="bg-gray-600 hover:gray-green-700 text-white py-2 px-10 rounded-md mt-8"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Dashboard;
