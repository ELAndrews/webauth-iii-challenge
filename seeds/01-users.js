const bcryptjs = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        {
          username: "admin",
          password: bcryptjs.hashSync("1234", 13),
          department: "IT"
        },
        {
          username: "Emma",
          password: bcryptjs.hashSync("1111", 13),
          department: "HR"
        },
        {
          username: "Matt",
          password: bcryptjs.hashSync("1111", 13),
          department: "Sales"
        }
      ]);
    });
};
