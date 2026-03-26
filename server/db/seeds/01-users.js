/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, name: 'Taylor Swift' },
    { id: 2, name: 'Drake' },
    { id: 3, name: 'Ed Sheeran' },
    { id: 'google-oauth2|111860014179848187305', name: 'Actual User' },
  ])
}
