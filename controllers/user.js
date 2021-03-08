const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utilFunctions = require("../utils/functions");
const userDatabaseModule = require("../models/database-modules/user");
const SendResponse = require("../utils/SendResponse");
const authUtil = require("../utils/auth");

// Global class decalaration
const sendAPIResponse = new SendResponse();

// Signup user
exports.signUpUser = async (req, res) => {
  const { userName, password } = req.body;

  // Check if username already exists
  const userDataIfExists = await userDatabaseModule.userDataIfExists(userName);

  // If username already exists
  if (userDataIfExists) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "Username already exists. Please choose another.",
    });
    return;
  }

  bcrypt.hash(password, 10, async function (err, hash) {
    let payload = { userId: uuidv4(), userName };

    const [accessToken, refreshToken] = authUtil.getAuthTokens(payload);

    await userDatabaseModule
      .addUserToUserTable({
        userId: uuidv4(),
        userName,
        password: hash,
        accessToken,
        refreshToken,
        joinedAt: utilFunctions.getSqlTimeStampForCurrentTime(),
      })
      .then((userData) => {
        sendAPIResponse.sendSuccessResponse({
          res,
          message: "User added successfully.",
          payload: userData,
        });
      })
      .catch((error) => {
        sendAPIResponse.sendErrorResponse({
          res,
          message: error.message,
        });
      });
  });
};

// Signup user
exports.signInUser = async (req, res) => {
  const { userName, password } = req.body;

  // Check if username already exists
  const userData = await userDatabaseModule.userDataIfExists(userName);

  // If username does not already exists
  if (!userData) {
    sendAPIResponse.sendErrorResponse({
      res,
      message: "No user found. Please check again.",
    });
    return;
  }

  bcrypt.compare(password, userData.password, async function (err, result) {
    // If password correct
    if (result) {
      let payload = { userId: userData.userId, userName };

      const [accessToken, refreshToken] = authUtil.getAuthTokens(payload);

      await userDatabaseModule
        .updateUserTokensWhenSignIn({
          accessToken,
          refreshToken,
          userId: userData.userId,
          userName: userData.userName,
        })
        .then((userData) => {
          sendAPIResponse.sendSuccessResponse({
            res,
            message: "User added successfully.",
            payload: userData,
          });
        })
        .catch((error) => {
          sendAPIResponse.sendErrorResponse({
            res,
            message: error.message,
          });
        });
    } else {
      sendAPIResponse.sendErrorResponse({
        res,
        message: "Your username or password is wrong. Please check again.",
      });
    }
  });
};
