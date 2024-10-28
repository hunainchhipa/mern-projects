import React, { useState } from "react";
import axios from "axios";
import { triggerRefresh } from "../redux/refreshSlice";
import { useDispatch } from "react-redux";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      name: taskName,
    };

    axios
      .post("http://localhost:5000/api/v1/tasks", taskData)
      .then((res) => {
        console.log("res", res);
        setTaskName("");
        dispatch(triggerRefresh(true));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="card mb-5">
        <div className="card-body py-5 bg-white">
          <h1 className="text-center">Task Manager</h1>
          <form onSubmit={handleSubmit}>
            <div className="d-flex mt-3 gap-2">
              <input
                type="text"
                name="name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="form-control"
                placeholder="Add task"
                autoComplete="off"
                required
              />
              <button type="submit" className="btn btn-success">
                SUBMIT
              </button>
            </div>
            {taskName?.length >= 50 && (
              <div className="text-danger mt-3">
                Task name can not be more than 50 characters
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
