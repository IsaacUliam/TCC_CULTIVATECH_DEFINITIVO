import type { Knex } from "knex";

export async function up(
  knex: Knex
): Promise<void> {

  await knex.schema.createTable(
    "users",
    (table) => {

      table
        .increments("id")
        .primary();

      table
        .text("name")
        .notNullable();

      table
        .text("email")
        .notNullable()
        .unique();

      table
        .text("password_hash")
        .notNullable();

      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.fn.now());

      table.index(
        ["email"],
        "idx_users_email"
      );
    }
  );
}

export async function down(
  knex: Knex
): Promise<void> {

  await knex.schema.dropTable("users");
}