import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-service'

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf()

    const followedUsers = db.follow.findMany({
      where: {
        followerId: self.id
      },
      include: {
        following: true
      }
    })

    return followedUsers
  } catch {
    return []
  }
}

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
      where: {
        id
      }
    })

    if (!otherUser) {
      throw new Error('User not found')
    }

    // User always will follow itself
    if (otherUser.id === self.id) {
      return true
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id
      }
    })

    return !!existingFollow
  } catch {
    return false
  }
}

export const followUser = async (id: string) => {
  const self = await getSelf()

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  })

  if (!otherUser) {
    throw new Error('User not found')
  }

  if (otherUser.id === self.id) {
    throw new Error('User cannot follow itself')
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id
    }
  })

  if (existingFollow) {
    throw new Error('User already followed')
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id
    },
    include: {
      follower: true,
      following: true
    }
  })

  return follow
}

export const unfollowUser = async (id: string) => {
  const self = await getSelf()

  const otherUser = await db.user.findUnique({
    where: {
      id
    }
  })

  if (!otherUser) {
    throw new Error('User not found')
  }

  if (otherUser.id === self.id) {
    throw new Error('User cannot unfollow itself')
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id
    }
  })

  if (!existingFollow) {
    throw new Error('User not followed')
  }

  const unfollow = await db.follow.delete({
    where: {
      id: existingFollow.id
    },
    include: {
      following: true
    }
  })

  return unfollow
}
