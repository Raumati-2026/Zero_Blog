/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    { id: 1, name: 'Taylor Swift' },
    { id: 2, name: 'Drake' },
    { id: 3, name: 'Ed Sheeran' },
  ])
}
