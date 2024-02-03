const model = require('../models/petModel');

module.exports.createNewPet = (req, res, next) => {
  if (req.body.user_id === undefined || req.body.name === undefined || req.body.type == undefined) {
    res.status(400).send("Error: user_id/petName/petType is undefined");
    return;
  }
  const data = {
    user_id: req.body.user_id,
    name: req.body.name,
    type: req.body.type
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Error creating new pet' });
    } else {
      res.status(201).json({ message: 'New pet created', petId: results.insertId });
    }
  };

  model.insertPet(data, callback);
};

module.exports.readAllPets = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getAllPets:", error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAllPets(callback);
};

module.exports.readPetById = (req, res, next) => {
  const data = {
    pet_id: req.params.id
  };

  if (req.params.id == undefined) {
    console.log(data);
    res.status(404).json({ error: "Not Found - Pet not found" });
    return;
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      console.log(results)
      res.status(404).json({ error: 'Pet not found' });
    } else {
      res.status(200).json(results[0]);
    }
  };

  model.selectPetId(data,callback)
}

module.exports.updatePetById = (req,res,next) => {
  if (req.body.user_id === undefined || req.body.name == undefined) {
    res.status(400).send("Error: petId/userId/petName is undefined");
    return;
  }

  const data = {
    pet_id: req.params.id,
    user_id: req.body.user_id,
    name: req.body.name
  };

  if (req.params.id == undefined) {
    res.status(404).json(error)
  }
  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Pet updated successfully', updatedPet: results });
    }
  };

  model.updatePetId(data, callback);
}


module.exports.deletePetById = (req, res, next) => {
  const data = {
    pet_id: req.params.id
  }
  if (req.params.id == undefined) {
    res.status(400).json({ error: "Bad Request - Missing petId" });
    return;
  }

  const callback = (error, results, fields) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results[0].affectedRows === 0) {
      res.status(404).json({ message: "Pet not found or already deleted" });
    } else {
      console.log(results)
      res.status(204).send(); 
    }
  };

  model.deletePetId(data, callback);
};
