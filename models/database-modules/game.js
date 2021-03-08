const DB = require("../../database/database");
const AppErrors = require("../../utils/errors");

const errorMessage = new AppErrors();

// Add game score to the tabel
exports.addGameScoreToGameTable = async ({ ...game }) => {
  return new Promise((resolve, reject) => {
    DB.query("INSERT INTO games SET ?", game, (error, results) => {
      if (error) {
        reject(new ReferenceError(errorMessage.createGameErorrMessage(error)));
      }

      resolve();
    });
  });
};

// Get all game scores by user ID
exports.getAllGameScores = async ({ userId }) => {
  return new Promise((resolve, reject) => {
    DB.query(
      "SELECT gameId, difficulty, score, scoredAt FROM games WHERE userId = ? ORDER BY scoredAt DESC",
      [userId],
      (error, allRowsOfGameScoresByUserId) => {
        if (error) {
          reject(new Error(errorMessage.createUserErorrMessage(error)));
        }

        resolve(allRowsOfGameScoresByUserId);
      }
    );
  });
};
