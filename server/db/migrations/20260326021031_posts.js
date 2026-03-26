/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('blog_entry', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.text('entry') // better than varchar for blog content
    table.date('date')
    table.integer('author_id').references('id').inTable('users')
    table.string('topic')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('blog_entry')
}
