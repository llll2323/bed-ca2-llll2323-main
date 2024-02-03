const model = require("../models/petTaskProgressModel");

module.exports.createTaskProgress = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    };

    // Validation for undefined fields
    if (!data.user_id || !data.task_id) {
        return res.status(404).json({ message: "user_id or task_id does not exist" });
    }
    if (!data.completion_date) {
        return res.status(400).json({ message: "completion date error" });
    }

    // Check if user exists
    model.checkUserExists(data, (userError, userResults) => {
        if (userError || userResults.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if task exists
        model.checkTaskExists(data, (taskError, taskResults) => {
            if (taskError || taskResults.length === 0) {
                return res.status(404).json({ message: "Task not found" });
            }

            // Both user and task exist, proceed to insert task progress
            model.insertProgress(data, (insertError, insertResults) => {
                if (insertError) {
                    console.error(insertError);
                    return res.status(500).json({ message: "An error occurred" });
                }
                console.log(insertResults);
                return res.status(201).json({
                    progress_id: insertResults.insertId,
                    user_id: data.user_id,
                    task_id: data.task_id,
                    completion_date: data.completion_date,
                    notes: data.notes
                });
            });
        });
    });
};

module.exports.getTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }

    const callback = (error,results) => {
        if (error) {
            console.log(error);
        } else if (results.length === 0) {
            console.log(results[0])
            return res.status(404).json({ message: "Task progress not found" });
        } else {
            const taskProgress = results[0];
            return res.status(200).json({
                progress_id: taskProgress.progress_id,
                user_id: taskProgress.user_id,
                task_id: taskProgress.task_id,
                completion_date: taskProgress.completion_date,
                notes: taskProgress.notes
            });
        }
    }
    model.selectTaskProgressById(data,callback)
};



module.exports.updateTaskProgressById = (req, res, next) =>
{
    if(req.body.notes == undefined)
    {
        res.status(400).send("Error: The notes entry is undefined"); 
        return;
    }

    const data = {
        progress_id: req.params.progress_id,
        notes: req.body.notes
    };

    const callback = (error, results, fields) => {

        if (error) {
            console.log(data)
            console.error("Error updateProgressById:", error);
            res.status(500).json(error);
        } 

         else if(results.affectedRows == 0) {
            console.log(results)
             res.status(404).json({ 
                 message: "Task progress not found"
             });
        } 
         else {

          next();
        }
    };

    model.updateById(data, callback);
};


module.exports.showUpdatedTaskProgressById = (req, res, next) =>
{

  const data = {
      progress_id: req.params.progress_id
  };

  const callback = (error, results, fields) => {
      if(error) {
          console.log(data)
          console.error("Error showUpdatedProgressById:", error);
          res.status(500).json(error);
      } else 
      res.status(200).json({
        message: "successfully updated"
      })
  }
 
  model.selectById(data, callback);
}



  module.exports.deleteTaskProgressById = (req, res, next) =>
{
    const data = {
        progress_id: req.params.progress_id,
    }

    const callback = (error, results, fields) => {

        if (error) {
            console.error("Error deleteProgressById:", error);
            res.status(500).json(error);
        } else {

            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task progress not found"
                });
            }

            else res.status(204).send();        
        }
    }

    model.deleteById(data, callback);
}