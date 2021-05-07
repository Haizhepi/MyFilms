const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");
const searchRoutes = require("./api/search");
const infoRoutes = require("./api/info");
const detailRoutes = require("./api/detail");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "/frontend/dist/frontend")));

const port = 8080;
app.use("/search", searchRoutes);
app.use("/info", infoRoutes);
app.use("/detail", detailRoutes);

app.use("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/frontend/dist/frontend/index.html"));
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});
app.listen(port);
