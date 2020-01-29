const db = require("../dbConfig");

module.exports = {
  getUsers,
  getUserById,
  getUsersByDepartment,
  login,
  register,
  removeUserById
};

function getUsers() {
  return db("users").groupBy("department");
}

function getUserById(id) {
  return db("users")
    .where("id", Number(id))
    .first();
}

function getUsersByDepartment(department) {
  return db("users").where({ department: department });
}

function login({ username }) {
  return db("users").where({ username });
}

function register({ username, password }) {
  return db("users").insert({ username, password });
}

function removeUserById(id) {
  return db("users")
    .where("id", Number(id))
    .del();
}
