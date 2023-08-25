/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('uploads', (table) => {
    table.increments('id')
    table.string('name', 255).notNullable()
    table.string('slug', 255).notNullable()
    table.integer('userId').notNullable()
    table.integer('size').notNullable()
    table.string('ETag', 255).notNullable()
    table.string('VersionId', 255).notNullable()
    table.boolean('safe').defaultTo(true).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.dropTable('uploads')
}
