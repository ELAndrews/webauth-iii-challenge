module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/users"
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: "./data/migrations"
    },
    seed: {
      directory: "./data/seed"
    }
  }
};
