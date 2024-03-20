const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const timeline = sequelize.define("timelines", {
    timeline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return timeline;
};
