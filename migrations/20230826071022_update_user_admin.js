/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.boolean('isAdmin').defaultTo(false)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('isAdmin')
  })
}
