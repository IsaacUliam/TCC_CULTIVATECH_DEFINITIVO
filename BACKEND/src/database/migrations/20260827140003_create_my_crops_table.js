// src/db/migrations/20260827140003_create_my_crops_table.js

exports.up = function (knex) {
  return knex.schema.createTable('my_crops', (table) => {
    table.increments('id').primary();

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table
      .integer('plant_id')
      .notNullable()
      .references('id')
      .inTable('plant_catalog');

    table.text('device_code').notNullable().unique();
    table.text('nickname').notNullable();
    table.text('last_watered_at');
    table.text('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));

    table.index('user_id', 'idx_crops_user_id');
    table.index('device_code', 'idx_crops_device_code');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('my_crops');
};
