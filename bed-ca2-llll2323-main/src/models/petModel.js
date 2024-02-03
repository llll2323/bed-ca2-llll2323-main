const pool = require('../services/db');

module.exports.insertPet = (data, callback) =>
{
const SQLSTATEMENT = `
    INSERT INTO pets (user_id, name, type)
    VALUES (?, ?, ?);
    `;
    console.log(data)
const VALUES = [data.user_id,data.name,data.type];
pool.query(SQLSTATEMENT, VALUES, callback);    
}

module.exports.selectAllPets = (callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM pets
  `;

  pool.query(SQLSTATEMENT, callback);
};

module.exports.selectPetId = (data,callback) => {
  const SQLSTATEMENT = `
  SELECT * FROM pets
  WHERE pet_id = ?
  `
  const VALUES = [data.pet_id]
  pool.query(SQLSTATEMENT,VALUES,callback)
}

module.exports.updatePetId = (data,callback) => {
  // change of ownership between users/ just want to change name
  // type of pet (species) cant really change so just these 2
  const SQLSTATEMENT = `
  UPDATE pets
  SET user_id = ?, name = ?
  WHERE pet_id = ?
  `
  const VALUES = [data.user_id, data.name, data.pet_id]
  pool.query(SQLSTATEMENT, VALUES, callback)
}

module.exports.deletePetId = (data,callback) => {
  const SQLSTATEMENT = `
  DELETE FROM pets
  WHERE pet_id = ?;
  ALTER TABLE user AUTO_INCREMENT = 1
  `
  const VALUES = [data.pet_id]
  pool.query(SQLSTATEMENT,VALUES,callback)
}
