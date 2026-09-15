import type { Knex } from "knex";

export async function up(
  knex: Knex
): Promise<void> {

  await knex.schema.createTable(
    "plant_catalog",
    (table) => {

      table
        .increments("id")
        .primary();

      table
        .text("popular_name")
        .notNullable();

      table
        .float("ideal_humidity")
        .notNullable();

      table
        .float("ideal_ph_min")
        .notNullable();

      table
        .float("ideal_ph_max")
        .notNullable();

      table
        .float("ideal_salinity_min")
        .notNullable();

      table
        .float("ideal_salinity_max")
        .notNullable();

      table.text("care_tips");
    }
  );
}

export async function down(
  knex: Knex
): Promise<void> {

  await knex.schema.dropTable(
    "plant_catalog"
  );
}