const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const stage = sequelize.define("stages", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chapter: {
      type: DataTypes.INTEGER,
    },
    parent: {
      type: DataTypes.INTEGER,
    }
  });

  return stage;
};
