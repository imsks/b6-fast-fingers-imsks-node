const config = require("../config");

class SendResponse {
  constructor() {
    this.envStatus = config.ENV;
  }

  // Send success response
  sendSuccessResponse({
    res,
    status = "Success",
    statusCode = 200,
    message,
    payload,
  }) {
    res.status(statusCode).json({
      status,
      message,
      payload,
    });
  }

  // Send error response
  sendErrorResponse({
    res,
    status = "Failed",
    statusCode = 400,
    message,
    error,
  }) {
    res.status(statusCode).json({
      status,
      message,
      error,
    });
  }
}

module.exports = SendResponse;
