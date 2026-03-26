import db from './connection'
import { Post, PostData } from '../../models/posts'

// GET all posts
export async function getPosts(): Promise<Post[]> {
  return db('posts').select()
}

// DELETE post by id
export async function deletePostsById(id: number): Promise<number> {
  return db('posts').where({ id }).del()
}

// PATCH post by id
export async function updatePostsById(
  id: number,
  newProperties: PostData,
): Promise<number> {
  return db('posts').where({ id }).update(newProperties)
}
