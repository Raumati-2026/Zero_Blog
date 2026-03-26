import db from './connection'
import { User, UserData } from '../../models/users'

// GET all users
export async function getUsers(): Promise<User[]> {
  return db('users').select()
}

// GET one user by id
export async function getUserById(id: number): Promise<User | undefined> {
  return db('users').where({ id }).first()
}

// DELETE user by id
export async function deleteUserById(id: number): Promise<number> {
  return db('users').where({ id }).del()
}

// PATCH user by id
export async function updateUserById(
  id: number,
  newProperties: UserData,
): Promise<number> {
  return db('users').where({ id }).update(newProperties)
}
