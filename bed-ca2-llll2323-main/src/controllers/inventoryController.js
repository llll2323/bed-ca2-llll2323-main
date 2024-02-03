const model = require('../models/inventoryModel');

module.exports.getInventoryByPetId = (req, res, next) => {

  if (req.params.pet_id == undefined) {
    res.status(400).json({ error: "Bad Request - Missing petId" });
    return;
  }

  const data = {
    id: req.params.pet_id
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Inventory not found for the specified pet" });
    } else {
      res.status(200).json(results);
    }
  };

  model.selectInventoryByPetId(data, callback);
};

// dont see a need for updating inventory item
  
  module.exports.deleteInventoryItem = (req, res, next) => {
    const data = {
        inventory_id: req.params.inventory_id
    } 
  
    if (req.params.inventory_id == undefined) {
      res.status(400).json({ error: "Bad Request - Missing inventoryId" });
      return;
    }
  
    const callback = (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: "Inventory item not found or already deleted" });
      } else {
        res.status(204).send();
      }
    };
  
    model.deleteInventoryItem(data, callback);
  };
  