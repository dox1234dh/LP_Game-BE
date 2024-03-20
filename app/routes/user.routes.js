const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // get List question with answer
  app.get("/api/question/:id", [authJwt.verifyToken], controller.listQuestionBroad);

  // create playLog with user
  app.post("/api/playLog", [authJwt.verifyToken], controller.createPlayLogBroad);

  // get Infor user
  app.get('/api/user', [authJwt.verifyToken], controller.getInfoUser);
};
