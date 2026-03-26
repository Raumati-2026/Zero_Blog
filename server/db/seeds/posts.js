/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('blog_entry').del()
  await knex('blog_entry').insert([
    {
      id: 1,
      title: 'My First Blog',
      entry: 'This is my very first blog post.',
      date: '2026-03-26',
      author_id: 1,
      topic: 'General',
    },
    {
      id: 2,
      title: 'Learning React',
      entry: 'React can be pretty annoying.',
      date: '2026-03-25',
      author_id: 1,
      topic: 'Coding',
    },
    {
      id: 3,
      title: 'Favourite Drink',
      entry: 'I love coke zero.',
      date: '2026-03-24',
      author_id: 2,
      topic: 'Lifestyle',
    },
  ])
}
