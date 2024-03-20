const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const author = sequelize.define("authors", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeline: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return author;
};
