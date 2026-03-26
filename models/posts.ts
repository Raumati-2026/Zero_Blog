export interface Post {
  id: string
  title: string
  entry: string
  date: string // knex date comes back as string
  author_id: number
  topic: string
}

// for PATCH / updates
export interface PostData {
  title?: string
  entry?: string
  date?: string
  author_id?: number
  topic?: string
}
