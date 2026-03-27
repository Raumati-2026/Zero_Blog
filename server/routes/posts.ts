import express from 'express'
import * as db from '../db/posts.ts'
import { JwtRequest } from '../auth0.ts'
import checkJwt from '../auth0.ts'
import { PostData } from '../../models/posts.ts'

const router = express.Router()

// GET http://localhost:3000/api/v1/posts - Get All posts

router.get('/', async (req, res) => {
  try {
    const posts = await db.getPosts()
    res.json({ posts })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// GET http://localhost:3000/api/v1/posts:id - Get post by id

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const post = await db.getPostById(id)
    res.json({ post })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// POST http://localhost:3000/api/v1/posts - Add post

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const { post } = req.body as { post: PostData }
  const auth0Id = req.auth?.sub
  const givenName = req.auth?.given_name || ''
  const familyName = req.auth?.family_name || ''
  const fullName = req.auth?.name || `${givenName} ${familyName}`.trim()

  if (!post) return res.status(400).send('Bad request: post data is required')
  if (!auth0Id) return res.status(401).send('Unauthorized')

  try {
    // ✅ Ensure user exists (DB function)
    await db.ensureUserExists(auth0Id, fullName)

    // ✅ Add the post (DB function)
    const newPost = await db.addPost(post, auth0Id)

    res.status(201).json({ post: newPost })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// DELETE http://localhost:3000/api/v1/posts/:id - delete post by id

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
    await db.deletePostById(id)

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
