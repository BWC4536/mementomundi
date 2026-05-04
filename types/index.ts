export type Trip = {
  id: string
  name: string
  place: string
  emoji: string
  color: string
  stickersUsed: number
  stickersTotal: number
  participants: string[]
  createdAt: string
  coverImage?: string
}

export type Post = {
  id: string
  tripId: string
  tripName: string
  image: string
  caption: string
  likes: number
  comments: number
  createdAt: string
}

export type User = {
  id: string
  name: string
  avatar: string
  email: string
  bio?: string
  trips: Trip[]
}
