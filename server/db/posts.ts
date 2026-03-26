import db from './connection'
import { Post, PostData } from '../../models/posts'

// GET all posts
export async function getPosts(): Promise<Post[]> {
  return db('blog_entry').select()
}

// DELETE post by id
export async function deletePostsById(id: number): Promise<number> {
  return db('blog_entry').where({ id }).del()
}

// PATCH post by id
export async function updatePostsById(
  id: number,
  newProperties: PostData,
): Promise<number> {
  return db('blog_entry').where({ id }).update(newProperties)
}
