const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// routes
const userRouter = require('./routes/user');
const gameRouter = require('./routes/game');

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/game", gameRouter);

module.exports = app;