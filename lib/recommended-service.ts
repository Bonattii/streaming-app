import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-service'

export const getRecommended = async () => {
  let userId
  let users = []

  try {
    const self = await getSelf()
    userId = self.id
  } catch {
    userId = null
  }

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId
            }
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId
                }
              }
            }
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId
                }
              }
            }
          }
        ]
      },
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } else {
    users = await db.user.findMany({
      include: {
        stream: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  return users
}
