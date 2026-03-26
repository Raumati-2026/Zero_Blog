export interface User {
  id: number
  name: string
}

// for PATCH / updates
export interface UserData {
  name?: string
}
