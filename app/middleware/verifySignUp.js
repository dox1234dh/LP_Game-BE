const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateAccount = (req, res, next) => {
  // Account
  User.findOne({
    where: {
      account: req.body.account,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Account is already in use!",
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateAccount: checkDuplicateAccount,
};

module.exports = verifySignUp;
