const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const work = sequelize.define("works", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return work;
};
