const express = require("express");
const cors = require("cors");
const app = express();

//  routers:
const reminderRouter = require("./routes/reminder.router");

//  middlewares :
app.use(express.json());
app.use(cors());

//  use routers:
app.use("/api/v1/reminder", reminderRouter);
module.exports = app;
