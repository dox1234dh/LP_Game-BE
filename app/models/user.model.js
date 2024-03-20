const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      default: 0,
      allowNull: false,
    },
  });

  return User;
};
