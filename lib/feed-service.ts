import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-service'

export const getStreams = async () => {
  let userId
  let streams = []

  try {
    const self = await getSelf()
    userId = self.id
  } catch {
    userId = null
  }

  if (userId) {
    // Just get the streams where the user isn't blocked
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId
              }
            }
          }
        }
      },
      select: {
        thumbnailUrl: true,
        name: true,
        isLive: true,
        user: true,
        id: true
      },
      orderBy: [
        {
          isLive: 'desc'
        },
        {
          updatedAt: 'desc'
        }
      ]
    })
  } else {
    streams = await db.stream.findMany({
      select: {
        thumbnailUrl: true,
        name: true,
        isLive: true,
        user: true,
        id: true
      },
      orderBy: [
        {
          isLive: 'desc'
        },
        {
          updatedAt: 'desc'
        }
      ]
    })
  }

  return streams
}
