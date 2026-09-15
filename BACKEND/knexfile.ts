import type { Knex } from "knex";
import path from "path";

const config: Knex.Config = {
  client: "sqlite3",

  connection: {
    filename: path.resolve("data", "database.sqlite")
  },

  useNullAsDefault: true,

  migrations: {
    directory: path.resolve("src", "database", "migrations")
  }
};

export default config;