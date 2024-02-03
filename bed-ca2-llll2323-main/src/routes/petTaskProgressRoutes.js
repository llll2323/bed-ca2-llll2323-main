// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const petTaskProgressController = require("../controllers/petTaskProgressController");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post("/", petTaskProgressController.createTaskProgress)
router.get("/:progress_id", petTaskProgressController.getTaskProgressById)
router.put('/:progress_id', petTaskProgressController.updateTaskProgressById, petTaskProgressController.showUpdatedTaskProgressById);
router.delete('/:progress_id', petTaskProgressController.deleteTaskProgressById);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
