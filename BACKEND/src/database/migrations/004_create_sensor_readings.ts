import type { Knex } from "knex";

export async function up(
  knex: Knex
): Promise<void> {

  await knex.schema.createTable(
    "sensor_readings",
    (table) => {

      table
        .increments("id")
        .primary();

      table
        .integer("crop_id")
        .notNullable()
        .references("id")
        .inTable("my_crops")
        .onDelete("CASCADE");

      table
        .float("humidity_value")
        .notNullable();

      table
        .float("ph_value")
        .notNullable();

      table
        .float("salinity_value")
        .notNullable();

      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.fn.now());

      table.index(
        ["crop_id", "created_at"],
        "idx_sensor_crop_history"
      );
    }
  );
}

export async function down(
  knex: Knex
): Promise<void> {

  await knex.schema.dropTable(
    "sensor_readings"
  );
}