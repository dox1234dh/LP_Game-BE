const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    timezone: '+07:00', // for writing to database
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.answer = require("../models/answer.model.js")(sequelize, Sequelize);
db.question = require("../models/question.model.js")(sequelize, Sequelize);
db.playlog = require("../models/playlog.model.js")(sequelize, Sequelize);
db.timeline = require("../models/timeline.model.js")(sequelize, Sequelize);
db.typeQuestion = require("../models/typequestion.model.js")(sequelize, Sequelize);
db.author = require("../models/author.model.js")(sequelize, Sequelize);
db.chapter = require("../models/chapter.model.js")(sequelize, Sequelize);
db.stage = require("../models/stage.model.js")(sequelize, Sequelize);
db.work = require("../models/work.model.js")(sequelize, Sequelize);
db.processUser = require("../models/processuser.model.js")(sequelize, Sequelize);

// relationship
db.question.belongsTo(db.timeline, {foreignKey: 'timeLineId'})
db.timeline.hasMany(db.question, {foreignKey: 'timeLineId'})

db.question.belongsTo(db.typeQuestion, {foreignKey: 'typeQuestionId'})
db.typeQuestion.hasMany(db.question, {foreignKey: 'typeQuestionId'})

db.question.belongsTo(db.answer, {foreignKey: 'correctAnswerId'})
db.answer.hasMany(db.question, {foreignKey: 'correctAnswerId'})

db.question.belongsTo(db.stage, {foreignKey: 'stageId'})
db.stage.hasMany(db.question, {foreignKey: 'stageId'})

db.question.belongsTo(db.author, {foreignKey: 'authorId'})
db.author.hasMany(db.question, {foreignKey: 'authorId'})

module.exports = db;
