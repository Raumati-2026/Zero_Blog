import express from 'express'
import * as db from '../db/fruits.ts'
import { JwtRequest } from '../auth0.ts'
import checkJwt from '../auth0.ts'
import { Post, PostData } from '../../models/post.ts'

const router = express.Router()

// GET http://localhost:3000/api/v1/posts

router.get('/', async (req, res) => {
  try {
    const posts = await db.getPosts()
    res.json({ posts })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// POST http://localhost:3000/api/v1/posts

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const { post } = req.body as { post: PostData }
  const auth0Id = req.auth?.sub

  if (!post) {
    console.error('Bad request: missing post data')
    return res.status(400).send('Bad request: post data is required')
  }

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    const newPost = await db.addPost(post, auth0Id)

    res.status(201).json({ post: newPost })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// PUT http://localhost:3000/api/v1/posts:id

router.put('/:id', checkJwt, async (req: JwtRequest, res) => {
  const { post } = req.body as { post: PostData }
  const auth0Id = req.auth?.sub

  const id = Number(req.params.id)

  if (!post || !id) {
    console.error('Bad request - missing post data or id')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.userCanEdit(id, auth0Id)
    const updatedPost = await db.db.updatePostById(id, post)

    res.status(200).json({ post: updatedPost })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return res
        .status(403)
        .send('Forbidden: Only the creator can update this post')
    }
  }
})

// DELETE http://localhost:3000/api/v1/posts/:id

router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.auth?.sub

  if (!id) {
    console.error('Invalid post id')
    return res.status(400).send('Bad request')
  }

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.userCanEdit(id, auth0Id)
    await db.deletePost(id)

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return res
        .status(403)
        .send('Forbidden: Only the creator can delete this post')
    }
    res.status(500).send('Something went wrong')
  }
})

// PATCH http://localhost:3000/api/v1/posts/:id

router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.auth?.sub
  const updates = req.body

  if (!id) {
    console.error('Bad request: invalid post id')
    return res.status(400).send('Invalid post id')
  }

  if (!updates || Object.keys(updates).length === 0) {
    console.error('Bad request: no update data provided')
    return res.status(400).send('No update data provided')
  }

  if (!auth0Id) {
    console.error('Unauthorized: no auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    await db.userCanEdit(id, auth0Id)

    const { title, content, topic, date } = updates
    const safeUpdates = { title, content, topic, date }

    const updatedPost = await db.updatePostById(id, safeUpdates)

    res.status(200).json({ post: updatedPost })
  } catch (error) {
    console.error('Error updating post:', error)

    if (error instanceof Error && error.message === 'Unauthorized') {
      return res
        .status(403)
        .send('Forbidden: Only the creator can update this post')
    }

    res.status(500).send('Failed to update post')
  }
})

export default router
