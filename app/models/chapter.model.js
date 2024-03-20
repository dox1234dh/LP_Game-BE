const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const chapter = sequelize.define("chapters", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return chapter;
};
