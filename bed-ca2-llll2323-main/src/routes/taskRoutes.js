// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const taskController = require("../controllers/taskController");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/',taskController.createNewTask)
router.get('/',taskController.getAllTasks)
router.get('/:id',taskController.getTaskId)
router.put('/:id',taskController.updateTaskById)
router.delete('/:id',taskController.deleteTaskById)
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
