const pool = require('../services/db');

module.exports.createTask = (data,callback) => {
    const SQLSTATEMENT = `
    INSERT INTO TASK (title,description,points)
    VALUES (?,?,?);
    `
    const VALUES = [data.title, data.description, data.points]
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.selectAllTasks = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM TASK;
    `

    pool.query(SQLSTATEMENT,callback)
}

module.exports.selectTaskId = (data,callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM TASK
    WHERE task_id = ?
    `
    const VALUES = [data.task_id]
    pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.updateTaskId = (data,callback) => {
    const SQLSTATEMENT = `
    UPDATE task
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?
    `
    const VALUES = [data.title, data.description, data.points, data.task_id]
    pool.query(SQLSTATEMENT, VALUES, callback)
  }

module.exports.deleteTaskId = (data,callback) => {
    const SQLSTATEMENT = `
    DELETE FROM task 
    WHERE task_id = ?;
    ALTER TABLE user AUTO_INCREMENT = 1;
    `
    const VALUES = [data.id]
    pool.query(SQLSTATEMENT,VALUES,callback)
}