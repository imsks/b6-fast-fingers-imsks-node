const { v4: uuidv4 } = require("uuid");
const utilFunctions = require("../utils/functions");
const gameDatabaseModule = require("../models/database-modules/game");
const SendResponse = require("../utils/SendResponse");

// Global class decalaration
const sendAPIResponse = new SendResponse();

exports.test = async (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "This route is only for testing purpose.",
    id: uuidv4(),
  });
};

// Add a user
exports.addGameScore = async (req, res) => {
  const { userId, difficulty, score } = req.body;

  // Add game score to database
  await gameDatabaseModule
    .addGameScoreToGameTable({
      gameId: uuidv4(),
      userId,
      difficulty,
      score,
      scoredAt: utilFunctions.getSqlTimeStampForCurrentTime(),
    })
    .then(() => {
      sendAPIResponse.sendSuccessResponse({
        res,
        message: "Game score saved successfully.",
      });
    })
    .catch((error) => {
      sendAPIResponse.sendErrorResponse({
        res,
        message: error.message,
      });
    });
};

// Add a user
exports.getAGameScoresByUserId = async (req, res) => {
  const { userId } = req.body;

  // Add game score to database
  await gameDatabaseModule
    .getAllGameScores({
      userId,
    })
    .then((allGameScores) => {
      sendAPIResponse.sendSuccessResponse({
        res,
        payload: allGameScores,
        message: "Game score saved successfully.",
      });
    })
    .catch((error) => {
      sendAPIResponse.sendErrorResponse({
        res,
        message: error.message,
      });
    });
};
