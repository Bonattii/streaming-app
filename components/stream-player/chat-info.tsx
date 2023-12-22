import { useMemo } from 'react'
import { Info } from 'lucide-react'

import { Hint } from '@/components/hint'

interface ChatInfoProps {
  isDelay: boolean
  isFollowersOnly: boolean
}

export function ChatInfo({ isDelay, isFollowersOnly }: ChatInfoProps) {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelay) {
      return 'Only followers can chat'
    }

    if (isDelay && !isFollowersOnly) {
      return 'Messages are delayed by 3 seconds'
    }

    if (isDelay && isFollowersOnly) {
      return 'Only followers can chat. Messages are delayed by 3 seconds'
    }

    return ''
  }, [isDelay, isFollowersOnly])

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelay) {
      return 'Followers only'
    }

    if (isDelay && !isFollowersOnly) {
      return 'Slow mode'
    }

    if (isDelay && isFollowersOnly) {
      return 'Followers only and slow mode'
    }

    return ''
  }, [isDelay, isFollowersOnly])

  if (!isDelay && !isFollowersOnly) return null

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="w-4 h-4" />
      </Hint>

      <p className="text-xs font-semibold">{label}</p>
    </div>
  )
}
