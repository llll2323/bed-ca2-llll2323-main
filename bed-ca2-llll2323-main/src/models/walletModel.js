const pool = require('../services/db');


module.exports.updateWalletBalanceFromTasks  = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE petWallet
    SET balance = 
    (SELECT SUM(task.points) AS total_money
    FROM taskProgress
    INNER JOIN petTask ON petTaskProgress.task_id = petTask.task_id 
    WHERE petTaskProgress.pet_id = ?)
    WHERE pet_id = ?
    `;
    const VALUES = [data.pet_id, data.pet_id];
    // must declare twice since pet_id is referenced twice in WHERE
    pool.query(SQLSTATEMENT, VALUES, callback);
};
