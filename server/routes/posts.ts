import express from 'express'
import * as db from '../db/index'

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

// DELETE http://localhost:3000/api/v1/posts/:id

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deletePostsById(id)

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
})

// PATCH http://localhost:3000/api/v1/posts/:id

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const newProperties = req.body
    await db.updatePostsById(id, newProperties)

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
})
export default router
