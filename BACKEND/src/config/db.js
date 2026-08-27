// src/config/db.js
// Instância única do Knex conectada ao SQLite3, usada em todo o projeto

const knex = require('knex');
const knexConfig = require('../../knexfile');

const ambiente = process.env.NODE_ENV || 'development';

const db = knex(knexConfig[ambiente]);

module.exports = db;