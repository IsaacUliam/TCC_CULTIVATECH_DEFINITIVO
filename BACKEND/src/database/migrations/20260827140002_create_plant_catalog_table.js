// src/db/migrations/20260827140002_create_plant_catalog_table.js

exports.up = function (knex) {
  return knex.schema.createTable('plant_catalog', (table) => {
    table.increments('id').primary();
    table.text('popular_name').notNullable();
    table.float('ideal_humidity').notNullable();
    table.float('ideal_ph_min').notNullable();
    table.float('ideal_ph_max').notNullable();
    table.float('ideal_salinity_min').notNullable();
    table.float('ideal_salinity_max').notNullable();
    table.text('care_tips');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('plant_catalog');
};
