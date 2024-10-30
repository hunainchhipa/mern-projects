import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/api/v1/login", data)
      .then((res) => {
        const token = res?.data?.token;

        if (token) {
          localStorage.setItem("token", token);
          navigate("/dashboard");
        }
        setMessage(res?.data?.msg);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Login failed! Please try again.");
      });
  };

  // clear user created message after 3  seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <div className="min-h-svh flex flex-col justify-center items-center">
        <div className="card shadow-xl w-full max-w-96 border rounded-md py-8 px-8">
          <div className="card-body">
            <h1 className="text-center text-2xl mb-10">Login/Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="text-gray-500 sm:text-sm mb-1 w-fit"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  {...register("username", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 mb-3 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
                {errors.username && (
                  <span className="text-red-800 mb-2 text-sm">
                    username is required
                  </span>
                )}

                <label
                  htmlFor="password"
                  className="text-gray-500 sm:text-sm mb-1 w-fit"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 mb-3 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
                {errors.password && (
                  <span className="text-red-800 mb-2 text-sm">
                    password is required
                  </span>
                )}

                <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-md mt-1">
                  SUBMIT
                </button>
              </div>
            </form>
            {message && (
              <div className="text-center text-sm text-green-800 mt-2">
                {message}
              </div>
            )}
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md mt-3 w-full"
            onClick={() => navigate("/dashboard")}
          >
            Go to dashboard
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
