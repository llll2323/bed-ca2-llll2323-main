// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const taskProgressController = require("../controllers/petTaskProgressController");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post("/", taskProgressController.createTaskProgress)
router.get("/:id", taskProgressController.getTaskProgressById)
router.put('/:progress_id', taskProgressController.updateTaskProgressById, taskProgressController.showUpdatedTaskProgressById);
router.delete('/:progress_id', taskProgressController.deleteTaskProgressById);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
