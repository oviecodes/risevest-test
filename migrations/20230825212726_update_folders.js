/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.alterTable('folders', (table) => {
    table.integer('userId')
    table.foreign('userId').references('users.id').deferrable('deferred')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.alterTable('folders', (table) => {
    table.dropForeign('userId')
    table.dropColumn('userId')
  })
}
