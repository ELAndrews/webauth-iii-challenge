const router = require("express").Router();
const Users = require("../models/users");

router.get("/users/:id", (req, res) => {
  Users.getUserById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
