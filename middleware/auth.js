const jwt = require("jsonwebtoken");

exports.verifyJWTToken = function (req, res, next) {
  const accessToken = req.headers.accesstoken;
  //if there is no token stored in cookies, the request is unauthorized
  if (!accessToken) {
    return res.status(403).json({
      success: "Failed",
      message: "You are not allowed to access this page.",
    });
  }

  let payload;
  try {
    //use the jwt.verify method to verify the access token
    //throws an error if the token has expired or has a invalid signature
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    res.payload = payload;
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    return res.status(403).json({
      success: "Failed",
      message: "Long time no see. Please login to continue.",
    });
  }
};
