/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  return knex.schema.createTable('folder_files', (table) => {
    table.increments('id')
    table.integer('folderId').unsigned()
    table.foreign('folderId').references('folders.id').deferrable('deferred')
    table.integer('uploadId').unsigned()
    table.foreign('uploadId').references('uploads.id').deferrable('deferred')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  return knex.schema.createTable('folder_files')
}
