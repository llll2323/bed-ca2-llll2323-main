const pool = require("../services/db");

module.exports.insertProgress = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO taskprogress (user_id,task_id,completion_date,notes) 
    VALUES (?,?,?,?)
    `;
  const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// selecting 1 just checks if it exists

module.exports.checkUserExists = (data, callback) => {
  const SQLSTATEMENT = `SELECT 1 FROM user WHERE user_id = ?`;
  const VALUES = [data.user_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.checkTaskExists = (data, callback) => {
  const SQLSTATEMENT = `SELECT 1 FROM task WHERE task_id = ?`;
  const VALUES = [data.task_id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateById = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE taskprogress
    SET notes = ?
    WHERE progress_id = ?;
    `;

  const VALUES = [data.notes, data.progress_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectTaskProgressById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT progress_id, user_id, task_id, completion_date, notes 
    FROM taskprogress 
    WHERE progress_id = ?`;
  const VALUES = [data.id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.deleteById = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM taskprogress
    WHERE progress_id = ?;
    ALTER TABLE taskprogress AUTO_INCREMENT = 1;
    `;

  const VALUES = [data.progress_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT progress_id, user_id, task_id, DATE(completion_date) AS completion_date, notes
    FROM taskprogress
    WHERE progress_id = ?
    `;
  const VALUES = [data.id];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
