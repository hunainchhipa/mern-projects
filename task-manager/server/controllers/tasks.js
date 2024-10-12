const Task = require("../models/task");
const asyncWrapper = require("../models/async");

// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({}); // this model.find() method returns all the tasks
//     res.status(200).json({ tasks: tasks });
//     // res.status(200).json({ tasks, amount: tasks.length });
//     // res.status(200).json({ status: "success", data: { tasks } });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// using asyncWrapper middleware to avoid try catch
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({}); // this model.find() method returns all the tasks
  res.status(200).json({ tasks: tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // creating a custom error message
    const error = new Error(`No task with id : ${taskID}`);
    error.status = 404;
    return next(error);
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    // creating a custom error message
    const error = new Error(`No task with id : ${taskID}`);
    error.status = 404;
    return next(error);
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    // creating a custom error message
    const error = new Error(`No task with id : ${taskID}`);
    error.status = 404;
    return next(error);
    // return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
