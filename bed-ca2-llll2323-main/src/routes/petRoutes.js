const express = require("express");
const petController = require("../controllers/petController");
const shopController = require("../controllers/petShopController")
const inventoryController = require("../controllers/inventoryController");
const router = express.Router();

router.post("/", petController.createNewPet);
router.post("/shop",shopController.createNewItem)
router.get("/", petController.readAllPets);
router.get("/shop",shopController.getAllShop)
router.get("/:id", petController.readPetById);
router.get('/:id',inventoryController.getInventoryByPetId)
router.put("/:id", petController.updatePetById);
router.delete("/:id", petController.deletePetById);
router.delete('/inventory/:inventory_id',inventoryController.deleteInventoryItem)
module.exports = router;

