import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditTask = () => {
  const location = useLocation();
  const data = location?.state;
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState(data?.name);
  const [isCompleted, setIsCompleted] = useState(data?.completed);

  const handleEditTask = (e) => {
    e.preventDefault();

    const taskData = {
      name: taskName,
      completed: isCompleted,
    };

    axios
      .patch(`http://localhost:5000/api/v1/tasks/${data?.id}`, taskData)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container my-5">
        <form onSubmit={handleEditTask}>
          <div className="card edit-task">
            <div className="card-body">
              <h1 className="text-center">Edit Task</h1>
              <div className="d-flex justify-content-between mt-5">
                <div>
                  <p>Task ID:</p>
                  <p>Name:</p>
                  <p className={`${taskName?.length >= 30 && "mt-5"}`}>
                    Completed:
                  </p>
                </div>

                <div>
                  <p>{data?.id}</p>
                  <p>
                    <input
                      type="text"
                      name="name"
                      defaultValue={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      className="form-control"
                      placeholder="Edit task"
                      required
                    />
                  </p>

                  {taskName?.length >= 30 && (
                    <div className="text-danger">
                      Task name can not be more than 30 characters
                    </div>
                  )}
                  <p>
                    <input
                      type="checkbox"
                      name="completed"
                      checked={isCompleted}
                      onChange={() => setIsCompleted(!isCompleted)} // Update the state
                      className="form-check-input"
                    />
                  </p>
                </div>
              </div>
              <button className="btn btn-success mt-3 w-100">Edit</button>
            </div>
          </div>
        </form>

        <div className="text-center">
          <Link to={"/"}>
            <button className="btn btn-dark px-5 py-2 mt-5">
              Back to tasks
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default EditTask;
