import { notFound } from 'next/navigation'

import { isBlockedByUser } from '@/lib/block-service'
import { getUserByUsername } from '@/lib/user-service'
import { isFollowingUser } from '@/lib/follow-service'

import { Actions } from './_components/actions'

interface UserPageProps {
  params: {
    username: string
  }
}

export default async function UserPage({
  params: { username }
}: UserPageProps) {
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>user ID: {user.id}</p>
      <p>is following: {`${isFollowing}`}</p>
      <p>is blocked by this user: {`${isBlocked}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  )
}
