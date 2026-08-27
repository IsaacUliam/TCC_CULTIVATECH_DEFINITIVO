// src/db/migrations/20260827140004_create_sensor_readings_table.js

exports.up = function (knex) {
  return knex.schema.createTable('sensor_readings', (table) => {
    table.increments('id').primary();

    table
      .integer('crop_id')
      .notNullable()
      .references('id')
      .inTable('my_crops')
      .onDelete('CASCADE');

    table.float('humidity_value').notNullable();
    table.float('ph_value').notNullable();
    table.float('salinity_value').notNullable();
    table.text('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));

    table.index(['crop_id', 'created_at'], 'idx_sensor_crop_history');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('sensor_readings');
};
