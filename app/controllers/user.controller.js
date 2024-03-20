const db = require("../models");
const Question = db.question;
const Answer = db.answer;
const Timeline = db.timeline;
const Stage = db.stage;
const TypeQuestion = db.typeQuestion;
const Author = db.author;
const PlayLog = db.playlog;
const User = db.user;
const ProcessUser = db.processUser;

exports.listQuestionBroad = async (req, res) => {
  try {
    // get Question with Answer
    let listData = await Question.findAll({
      attributes: ["id", "question", "answers", "hint"],
      where: {
        stageId: req.params.id,
      },
      include: [Answer, Timeline, Stage, TypeQuestion, Author],
    });
    listData = listData.map((item) => item.get({ plain: true }));
    const temp = JSON.parse(JSON.stringify(listData));
    for (let index = 0; index < temp.length; index++) {
      let listAnswers = await Answer.findAll({
        attributes: ["id", "answer"],
        where: {
          id: temp[index].answers,
        },
      });
      listAnswers = listAnswers.map((x) => x.get({ plain: true }));
      const tempChild = JSON.parse(JSON.stringify(listAnswers));
      temp[index].listAnswers = tempChild;
    }
    return res.status(200).json(temp);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createPlayLogBroad = async (req, res) => {
  if (req.score < 0) return res.status(500).send({ message: "Wrong data" });
  const t = await db.sequelize.transaction();
  try {
    const isExistUser = await ProcessUser.findOne(
      {
        raw: true,
        where: {
          idUser: req.userId,
          stage: req.body.stage,
        },
      },
      { transaction: t }
    );
    if (
      (isExistUser && isExistUser.status !== 1) ||
      (isExistUser.status === 1 && req.body.status === 1)
    ) {
      await ProcessUser.update(
        {
          status: req.body.status,
        },
        {
          where: {
            idUser: req.userId,
            stage: req.body.stage,
          },
        },
        { transaction: t }
      );
    } else {
      await ProcessUser.create(
        {
          idUser: req.userId,
          stage: req.body.stage,
          status: req.body.status,
        },
        { transaction: t }
      );
    }
    // save playLog
    await PlayLog.create(
      {
        idUser: req.userId,
        score: req.body.score,
        stage: req.body.stage,
        status: req.body.status,
      },
      { transaction: t }
    );
    await t.commit();
    return res.status(200).send("save playLog with user");
  } catch (err) {
    console.log(err.message);
    await t.rollback();
    return res.status(500).json({ message: err.message });
  }
};

exports.getInfoUser = (req, res) => {
  User.findOne({
    where: {
      id: req.userId,
    },
  }).then((user) => {
    if (!user) {
      return res.status(401).send({ message: "Unauthenticated." });
    } else {
      return res.status(200).send({
        user,
      });
    }
  });
};
