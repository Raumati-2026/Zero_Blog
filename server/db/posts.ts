import db from './connection'
import { Post, PostData } from '../../models/posts'

// GET all posts
export async function getPosts(): Promise<Post[]> {
  return db('blog_entry').select()
}

// DELETE post by id
export async function deletePostById(id: number): Promise<number> {
  return db('blog_entry').where({ id }).del()
}

// PATCH post by id
export async function updatePostById(
  id: number,
  newProperties: PostData,
): Promise<number> {
  return db('blog_entry').where({ id }).update(newProperties)
}

export async function userCanEdit(
  postId: number,
  auth0Id: string,
) {
  return db('blog_entry')
    .where({ id: postId })
    .first()
    .then((post : PostData) => {
      if (post.author_id !== Number(auth0Id)) {
        throw new Error('Unauthorized')
      }
    })
}