import type { Knex } from "knex";

export async function up(
  knex: Knex
): Promise<void> {

  await knex.schema.createTable(
    "my_crops",
    (table) => {

      table
        .increments("id")
        .primary();

      table
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");

      table
        .integer("plant_id")
        .notNullable()
        .references("id")
        .inTable("plant_catalog");

      table
        .text("device_code")
        .notNullable()
        .unique();

      table
        .text("nickname")
        .notNullable();

      table.text("alerts");

      table.timestamp(
        "last_watered_at"
      );

      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.fn.now());

      table.index(
        ["user_id"],
        "idx_crops_user_id"
      );

      table.index(
        ["device_code"],
        "idx_crops_device_code"
      );
    }
  );
}

export async function down(
  knex: Knex
): Promise<void> {

  await knex.schema.dropTable(
    "my_crops"
  );
}