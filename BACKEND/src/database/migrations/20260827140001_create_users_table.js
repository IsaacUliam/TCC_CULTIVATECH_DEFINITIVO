// src/db/migrations/20260827140001_create_users_table.js

exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('email').notNullable().unique();
    table.text('password_hash').notNullable();
    table.text('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));

    table.index('email', 'idx_users_email');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
