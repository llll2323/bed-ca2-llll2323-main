const model = require("../models/userModel");
  
module.exports.createNewUser = (req, res, next) => {
  if (req.body.username === undefined || req.body.email === undefined) {
    res.status(400).send("Error: username/email is undefined");
    return;
  }

  const data = {
    email: req.body.email,
    username: req.body.username,
  };

  const checkEmailCallback = (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else if (results.length > 0) {
      res.status(409).json({ error: "Conflict - Email already exists" });
    } else {
      // If email doesn't exist, proceed to create the new user
      insertNewUser();
    }
  };

  const insertUserCallback = (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      console.log(results)
      console.log(results.insertId)
      res.status(201).json({
        user_id: results.insertId,
        username: data.username,
        email: data.email,
      });
    }
  };

  const insertNewUser = () => {
    model.insertSingle(data, insertUserCallback);
  };
  model.checkIfEmailExists(data, checkEmailCallback);
};

module.exports.updateUserById = (req,res,next) => {
  if (req.body.username === undefined || req.body.email === undefined) {
    res.status(400).send("Error: username/email is undefined");
    return;
  }

  const data = {
    email: req.body.email,
    username: req.body.username,
    id: req.params.id
  };

  const checkEmailCallback = (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else if (results.length > 0) {
      res.status(409).json({ error: "Conflict - Email already exists" });
    } else {
      // If email doesn't exist, proceed to update the user
      updateUser();
    }
  };
  if (req.params.id == undefined) {
    res.status(404).json(error)
  }

  const updateUserCallback = (error,results,fields) => {
    if (error){
      console.log(error)
    } else {
      res.status(200).json({
        user_id: data.id,
        username: data.username,
        email: data.email
      })
    }
  }

  const updateUser = () => {
    model.updateById(data, updateUserCallback);
  };
  model.checkIfEmailExists(data, checkEmailCallback);
}
 

module.exports.readAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllUser:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAllUsers(callback);
};

module.exports.readUserById = (req, res, next) => {
  const data = {
    id: req.params.id
  };

  if (req.params.id == undefined) {
    console.log(data);
    res.status(404).json({ error: "Not Found - User not found" });
    return;
  }

  const userCallback = (error, userResults, fields) => {
    if (error) {
      console.error("Error reading user by id:", error);
      res.status(500).json(error);
      return;
    } else if (userResults.length === 0) {
      res.status(404).json({ error: "Not Found - User not found" });
      return;
    } else {
      const pointsCallback = (pointsError, pointsResults) => {
        if (pointsError) {
          console.error("Error reading total points:", pointsError);
          res.status(500).json(pointsError);
        } else {
          const data = userResults[0];
          res.status(200).json({
            user_id: data.user_id,
            username: data.username,
            email: data.email,
            total_points: pointsResults[0] ? pointsResults[0].total_points : 0 // if else statement; if there are points use the first result else 0  format: condition ? value_if_true : value_if_false
          });
        }
      };
      model.selectTotalPoints(data, pointsCallback);
    }
  };
  model.selectUserById(data, userCallback);
};

module.exports.deleteUser = (req,res,next) => {
  const data = {
    id: req.params.id
  }

  const callback = (error,results,fields) => {
    if (error){
      console.log(error)
    } else if (results.affectedRows == undefined){
      res.status(404).json({
        message: "user does not exist"
      })
    }else{
      console.log(results.affectedRows)
      res.status(204).json(results)
    }
  }
  model.deleteById(data, callback)
}