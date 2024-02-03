const model = require("../models/walletModel");

module.exports.updatePetWalletFromTasks = (req, res, next) => {
  const data = {
    pet_id: req.params.pet_id,
  };

  if (req.params.pet_id == undefined) {
    res.status(400).json({ message: "pet_id undefined" });
  }

  const callback = (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      return res
        .status(200)
        .json({
          message: "Wallet balance updated",
          affectedRows: results.affectedRows,
        });
    }
  };
  model.updateWalletBalanceFromTasks(data, callback);
};
