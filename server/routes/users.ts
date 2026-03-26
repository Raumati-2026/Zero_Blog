import express from 'express'
import * as db from '../db/index'

const router = express.Router()

// GET http://localhost:3000/api/v1/users/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.getUsersById(id)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
})

export default router
