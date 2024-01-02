import { notFound } from 'next/navigation'

import { isBlockedByUser } from '@/lib/block-service'
import { getUserByUsername } from '@/lib/user-service'
import { isFollowingUser } from '@/lib/follow-service'
import { StreamPlayer } from '@/components/stream-player'

interface UserPageProps {
  params: {
    username: string
  }
}

export default async function Page({ params: { username } }: UserPageProps) {
  const user = await getUserByUsername(username)

  if (!user || !user.stream) {
    notFound()
  }

  const isBlocked = await isBlockedByUser(user.id)
  const isFollowing = await isFollowingUser(user.id)

  if (isBlocked) {
    notFound()
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  )
}
