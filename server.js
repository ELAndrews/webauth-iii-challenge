const express = require("express");

const routes = require("./data/router");
const allMiddleware = require("./data/middleware");

const server = express();

allMiddleware(server);

server.use("/api", routes);

server.get("/", (req, res) => {
  if (req.session.seenBefore) {
    res.json("welcome back");
  } else {
    req.session.seenBefore = true;
    res.json("Thanks for deciding to visit!");
  }
});

module.exports = server;
