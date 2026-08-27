// knexfile.js
// Configuração do Knex para o Cultiva Tech
// Usamos SQLite3 como banco de dados

const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src/database/cultiva_tech.sqlite3'),
    },
    useNullAsDefault: true, // obrigatório no SQLite
    pool: {
      afterCreate: (conn, cb) => {
        // SQLite não valida foreign keys por padrão — precisamos ligar isso
        conn.run('PRAGMA foreign_keys = ON', cb);
      },
    },
    migrations: {
      directory: path.resolve(__dirname, 'src/database/migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src/database/seeds'),
    },
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src/db/cultiva_tech.sqlite3'),
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      },
    },
    migrations: {
      directory: path.resolve(__dirname, 'src/database/migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src/database/seeds'),
    },
  },
};