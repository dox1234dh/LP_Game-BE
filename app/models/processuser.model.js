const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const processUser = sequelize.define("processUsers", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: 0
    }
  });

  return processUser;
};
