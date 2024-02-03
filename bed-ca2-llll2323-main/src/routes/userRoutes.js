// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require("express");
const userController = require("../controllers/userController");
// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/',userController.createNewUser)
router.get('/',userController.readAllUsers)
router.get('/:id',userController.readUserById)
router.put('/:id',userController.updateUserById)
router.delete('/:id',userController.deleteUser)
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;
