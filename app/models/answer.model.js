const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const answer = sequelize.define("answers", {
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return answer;
};
