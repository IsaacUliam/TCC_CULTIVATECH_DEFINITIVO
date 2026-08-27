// src/db/migrations/20260827140005_create_alerts_table.js

exports.up = function (knex) {
  return knex.schema.createTable('alerts', (table) => {
    table.increments('id').primary();

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table
      .integer('crop_id')
      .notNullable()
      .references('id')
      .inTable('my_crops')
      .onDelete('CASCADE');

    table
      .integer('reading_id')
      .references('id')
      .inTable('sensor_readings')
      .onDelete('SET NULL');

    table.text('alert_type').notNullable();
    table.text('severity').notNullable().defaultTo('WARNING');
    table.text('message').notNullable();
    table.boolean('is_resolved').notNullable().defaultTo(false);
    table.text('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));

    table.index(['user_id', 'is_resolved'], 'idx_alerts_active');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('alerts');
};
