'use server'

import { Stream } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-service'

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf()

    const selfSream = await db.stream.findUnique({
      where: {
        userId: self.id
      }
    })

    if (!selfSream) {
      throw new Error('Stream not found')
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelay: values.isChatDelay
    }

    const stream = await db.stream.update({
      where: {
        id: selfSream.id
      },
      data: {
        ...validData
      }
    })

    revalidatePath(`/u/${self.username}/chat`)
    revalidatePath(`/u/${self.username}`)
    revalidatePath(`/${self.username}`)

    return stream
  } catch {
    throw new Error('Internal Error')
  }
}
