const moment = require('moment');

// Get current timestamp for SQL
module.exports.getSqlTimeStampForCurrentTime = () =>
  moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
