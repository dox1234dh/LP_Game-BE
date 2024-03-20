const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const question = sequelize.define("questions", {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    correctAnswerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
    },
    typeQuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
    },
    timeLineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
    },
    hint: {
      type: DataTypes.STRING,
    },
    authorId: {
      type: DataTypes.INTEGER,
    },
    workId: {
      type: DataTypes.INTEGER,
    },
    stageId: {
      type: DataTypes.INTEGER
    }
  });

  return question;
};
