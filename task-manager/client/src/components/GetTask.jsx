import React, { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { triggerRefresh } from "../redux/refreshSlice";
import { useDispatch, useSelector } from "react-redux";

const GetTask = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = useSelector((state) => state.apiRefresh.refresh); // Listen for refresh state

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("http://localhost:5000/api/v1/tasks")
      .then((res) => {
        setTasks(res?.data?.tasks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/api/v1/tasks/${id}`)
      .then((res) => {
        dispatch(triggerRefresh());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center mt-5 pt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {tasks?.length <= 0 ? (
            <h4 className="text-center">No Data Found!</h4>
          ) : (
            <>
              {tasks?.map((task) => {
                return (
                  <div key={task?._id} className="card my-3">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="comleted-task">
                          {task?.completed && (
                            <FaRegCircleCheck className="edit-icon" />
                          )}
                        </div>
                        <h5 className="task-name mb-0">
                          {task?.completed ? (
                            <del>{task?.name}</del>
                          ) : (
                            <>{task?.name}</>
                          )}
                        </h5>
                      </div>
                      <div className="actions d-flex align-items-center gap-2">
                        <FaEdit
                          className="edit-icon cursor-pointer"
                          onClick={() => {
                            navigate("/edit-task", {
                              state: {
                                name: task?.name,
                                id: task?._id,
                                completed: task?.completed,
                              },
                            });
                          }}
                        />
                        <MdDelete
                          className="delete-icon cursor-pointer"
                          onClick={() => {
                            handleDeleteTask(task?._id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default GetTask;
