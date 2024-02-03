const model = require("../models/petTaskModel");

module.exports.createNewTask = (req, res, next) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    points: req.body.points,
  };
  if (req.body.title == undefined || req.body.points == undefined) {
    res.status(400).json({
      message: "title or description is undefined",
    });
  }
  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.status(201).json({
        task_id: results.insertId,
        title: data.title,
        description: data.description,
        points: data.points,
      });
    }
  };
  model.createTask(data, callback);
};

module.exports.getAllTasks = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(results);
    }
  };
  model.selectAllTasks(callback);
};

module.exports.getTaskId = (req, res, next) => {
  const data = {
    task_id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
    } else if (results.length == 0) {
      res.status(404).json({
        message: "task not found",
      });
    } else {
      const data = results[0];
      res.status(200).json({
        task_id: data.task_id,
        title: data.title,
        description: data.description,
        points: data.points,
      });
    }
  };
  model.selectTaskId(data, callback);
};

module.exports.updateTaskById = (req, res, next) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    points: req.body.points,
    task_id: req.params.id,
  };

  if (
    req.body.title == undefined ||
    req.body.description == undefined ||
    req.body.points == undefined
  ) {
    res.status(400).json({
      message: "missing title / description / points",
    });
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
    } else if (results.affectedRows == 0) {
      res.status(404).json({
        message: "Cannot update task that does not exist",
      });
    } else {
      console.log(data);
      res.status(200).json({
        task_id: results.insertId,
        title: data.title,
        description: data.description,
        points: data.points,
      });
    }
  };
  model.updateTaskId(data, callback);
};

module.exports.deleteTaskById = (req, res, next) => {
  const data = {
    id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
    } else if (results[0].affectedRows == 0) { // for some reason 2 sets of results are logged so only take the first one
      res.status(404).json({
        message: "Task does not exist",
      });
    } else {
      console.log(results);
      res.status(204).json({
        message: "Deleted successfully",
      });
    }
  };
  model.deleteTaskId(data, callback);
};
