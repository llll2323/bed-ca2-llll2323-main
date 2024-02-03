const pool = require('../services/db');

module.exports.allItems = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM petShop
    `
    pool.query(SQLSTATEMENT,callback)
}

module.exports.createItem = (data,callback) => {
    const SQLSTATEMENT = `
    INSERT INTO petShop (item_id,name,description,price,type) 
    VALUES (?,?,?,?,?)
    `
    const VALUES = [data.item_id,data.name,data.description,data.price,data.type]
    pool.query(SQLSTATEMENT,VALUES,callback)
}