import request from 'superagent'
import { Post, PostData } from '../../models/post'
const rootURL = new URL(`/api/v1`, document.baseURI)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getPostsById(id: string): Promise<Post> {
  await sleep(1500)

  return request
    .get(`${rootURL}/posts/${id}`)
    .then((res) => res.body.posts)
    .catch(logError)
}

export async function getPosts(): Promise<Post[]> {
  await sleep(1500)

  return request
    .get(`${rootURL}/posts`)
    .then((res) => res.body.posts)
    .catch(logError)
}

interface AddPostFunction {
  post: PostData
  token: string
}

export async function addPost({ post, token }: AddPostFunction): Promise<Post> {
  await sleep(1500)

  return request
    .post(`${rootURL}/posts`)
    .set('Authorization', `Bearer ${token}`)
    .send({ post })
    .then((res) => res.body.post)
    .catch(logError)
}

interface UpdatePostFunction {
  post: Post
  token: string
}
export async function updatePost({
  post,
  token,
}: UpdatePostFunction): Promise<Post> {
  await sleep(1500)

  return request
    .put(`${rootURL}/posts/${post.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ post })
    .then((res) => res.body.post)
    .catch(logError)
}

interface DeletePostFunction {
  id: number
  token: string
}
export async function deletePost({
  id,
  token,
}: DeletePostFunction): Promise<void> {
  await sleep(1500)

  return request
    .delete(`${rootURL}/posts/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch(logError)
}

function logError(err: Error) {
  console.log(err)
  if (err.message === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error('Only the user can update and delete it')
  } else {
    console.error('Error consuming the API (in blogs.ts):', err.message)
    throw err
  }
}
