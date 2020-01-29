const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/users");
const {
  validateRequestFullBody,
  validateUsername
} = require("../middleware/user-middleware");

router.post("/register", validateRequestFullBody, (req, res) => {
  const { username, password } = req.body;

  const bcryptHash = bcrypt.hashSync(password, 12);
  const user = {
    username,
    password: bcryptHash
  };

  Users.register(user)
    .then(id => {
      res.status(201).json(`New user registerd with id: ${id}`);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", validateRequestFullBody, validateUsername, (req, res) => {
  const { username, password } = req.body;
  Users.login({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        if (user.username === "admin") {
          res.status(200).json(`Logged in! Welcome back Emma`);
        } else {
          res.status(200).json(`Logged in! Welcome back ${user.username}`);
        }
      } else {
        res.status(401).json(`You shall not pass!`);
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
