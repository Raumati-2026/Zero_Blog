import express from 'express'
import * as db from '../db/fruits.ts'
import { JwtRequest } from '../auth0.ts'
import checkJwt from '../auth0.ts'

const router = express.Router()

// GET http://localhost:3000/api/v1/users/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const user = await db.getUsersById(id)
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.json(user)
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
})

export default router
