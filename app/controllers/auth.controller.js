const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    gender: req.body.gender,
    account: req.body.account,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => {
      return res.send({ message: "User registered successfully!" });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      account: req.body.account,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      return res.status(200).send({
        accessToken: token,
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};
