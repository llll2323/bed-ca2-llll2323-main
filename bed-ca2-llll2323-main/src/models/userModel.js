const pool = require('../services/db');


module.exports.checkIfEmailExists = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM user 
    WHERE email = ?
    
  `;
  const VALUES = [data.email]
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.insertSingle = (data, callback) =>
{
const SQLSTATEMENT = `
    INSERT INTO user (username, email)
    VALUES (?, ?);
    `;
    console.log(data)
const VALUES = [data.username, data.email];
pool.query(SQLSTATEMENT, VALUES, callback);    
}

module.exports.selectAllUsers = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM user
    `;
  
    pool.query(SQLSTATEMENT, callback);
  };

module.exports.selectUserById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM user
    WHERE user_id = ?
    `;

    const VALUES = [data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
  };

  module.exports.selectTotalPoints = (data,callback) => {
    const SQLSTATEMENT = `
    SELECT SUM(task.points) AS total_points
    FROM taskprogress
    INNER JOIN task on task.task_id = taskprogress.task_id
    WHERE taskprogress.user_id = ?
    `
    const VALUES = [data.id]
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.updateById = (data,callback) => {
  const SQLSTATEMENT = `
  UPDATE user
  SET username = ?, email = ?
  WHERE user_id = ?
  `
  const VALUES = [data.username, data.email, data.id]
  pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.deleteById = (data,callback) => {
  const SQLSTATEMENT = `
  DELETE FROM user
  WHERE user_id = ?;
  ALTER TABLE user AUTO_INCREMENT = 1
  `
  const VALUES = [data.id]
  pool.query(SQLSTATEMENT,VALUES,callback)
}