// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const petTaskController = require("../controllers/petTaskController");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/',petTaskController.createNewTask)
router.get('/',petTaskController.getAllTasks)
router.get('/:id',petTaskController.getTaskId)
router.put('/:id',petTaskController.updateTaskById)
router.delete('/:id',petTaskController.deleteTaskById)
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
