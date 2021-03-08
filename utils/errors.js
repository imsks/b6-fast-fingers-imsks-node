const config = require("../config");

class AppErrors {
  constructor() {
    this.envStatus = config.ENV;
  }

  // Create user errors
  createUserErorrMessage(error) {
    switch (error.code) {
      case "ER_NO_SUCH_TABLE": {
        const errorMessage =
          this.envStatus == "0"
            ? "No table exists with this name"
            : "Something went wrong. Please try later!";

        return errorMessage;
      }

      default:
        return "Something went wrong. Please try later!";
    }
  }

  // Create game errors
  createGameErorrMessage(error) {
    switch (error.code) {
      // 1. Wrong user id provided
      case "ER_NO_REFERENCED_ROW_2": {
        const errorMessage =
          this.envStatus == "0"
            ? "No user exists with this ID"
            : "Something went wrong. Please try later!";

        return errorMessage;
      }

      default:
        return "Something went wrong. Please try later!";
    }
  }
}

module.exports = AppErrors;
