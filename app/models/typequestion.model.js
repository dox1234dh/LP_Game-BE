const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const typeQuestion = sequelize.define("typeQuestions", {
    typeQuestion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return typeQuestion;
};
