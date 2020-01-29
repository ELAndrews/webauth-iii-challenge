const Users = require("../models/users");

module.exports = {
  validateRequestFullBody,
  validateUsername
};

function validateRequestFullBody(req, res, next) {
  if (req.body.username && req.body.password && req.body.department) {
    next();
  } else if (req.body.username || req.body.password || req.body.department) {
    res
      .status(400)
      .json(`Please provide a valide username, password AND department`);
  } else {
    res
      .status(400)
      .json(`You must provide a valide username, password AND department`);
  }
}

function validateUsername(req, res, next) {
  Users.getUsers()
    .then(users => {
      let usernames = users.map(curr => curr.username);
      if (usernames.includes(req.body.username)) {
        next();
      } else {
        res.status(400).json(`This is an invalid username`);
      }
    })
    .catch(error => {
      res.status(400).json(`Error validating username`);
    });
}
