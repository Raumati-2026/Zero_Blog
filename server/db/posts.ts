import db from './connection'
import { Post, PostData } from '../../models/posts'

// GET all posts
export async function getPosts(): Promise<Post[]> {
  return db('blog_entry').select()
}

//GET one post by id
export async function getPostById(id: number): Promise<Post | undefined> {
  return db('blog_entry').where({ id }).first()
}

//ADD new post
export async function addPost(post: PostData, auth0Id: string): Promise<Post> {
  const [newPost] = await db('blog_entry')
    .insert({
      ...post,
      author_id: auth0Id,
    })
    .returning(['id', 'title', 'entry', 'date', 'author_id', 'topic'])

  return newPost
}

// Check if user exists, if not insert them
export async function ensureUserExists(auth0Id: string, fullName: string) {
  const existingUser = await db('users').where({ id: auth0Id }).first()
  if (!existingUser) {
    await db('users').insert({
      id: auth0Id,
      name: fullName,
    })
  }
  return existingUser || { id: auth0Id, full_name: fullName }
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

export async function userCanEdit(postId: number, auth0Id: string) {
  return db('blog_entry')
    .where({ id: postId })
    .first()
    .then((post: PostData) => {
      if (post.author_id !== Number(auth0Id)) {
        throw new Error('Unauthorized')
      }
    })
}
