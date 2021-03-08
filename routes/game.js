const router = require("express").Router();
const gameController = require('../controllers/game');

router.route("/test").get(gameController.test);
router.route("/add-game-score").post(gameController.addGameScore);
router.route("/get-all-game-scores-by-userid").post(gameController.getAGameScoresByUserId);

module.exports = router;