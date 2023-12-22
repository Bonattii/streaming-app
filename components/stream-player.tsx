'use client'

import { useViewerToken } from '@/hooks/use-viewer-token'
import { Stream, User } from '@prisma/client'

interface StreamPlayerProps {
  user: User & { stream: Stream | null }
  stream: Stream
  isFollowing: boolean
}

export function StreamPlayer({ stream, user, isFollowing }: StreamPlayerProps) {
  const { identity, name, token } = useViewerToken(user.id)

  if (!token || !identity || !name) {
    return <div>Cannot watch the stream</div>
  }

  return <div>Allowed to watch the stream</div>
}
