const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const playlog = sequelize.define("playLogs", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
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

  return playlog;
};
