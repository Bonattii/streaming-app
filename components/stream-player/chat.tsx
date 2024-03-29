'use client'

import { useMediaQuery } from 'usehooks-ts'
import { ConnectionState } from 'livekit-client'
import { useEffect, useMemo, useState } from 'react'
import {
  useChat,
  useConnectionState,
  useRemoteParticipant
} from '@livekit/components-react'

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'

import { ChatCommunity } from './chat-community'
import { ChatForm, ChatFormSkeleton } from './chat-form'
import { ChatList, ChatListSkeleton } from './chat-list'
import { ChatHeader, ChatHeaderSkeleton } from './chat-header'

interface ChatProps {
  viewerName: string
  hostName: string
  hostIdentity: string
  isFollowing: boolean
  isChatEnabled: boolean
  isChatDelay: boolean
  isChatFollowersOnly: boolean
}

export function Chat({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelay,
  isChatFollowersOnly
}: ChatProps) {
  const matches = useMediaQuery('(max-width: 1024px)')
  const { variant, onExpand } = useChatSidebar((state) => state)
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)

  const isOnline = participant && connectionState === ConnectionState.Connected

  const isHidden = !isChatEnabled || !isOnline

  const [value, setValue] = useState('')
  const { chatMessages: messages, send } = useChat()

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp)
  }, [messages])

  const onSubmit = () => {
    if (!send) return

    send(value)
    setValue('')
  }

  const onChange = (value: string) => {
    setValue(value)
  }

  useEffect(() => {
    if (matches) {
      onExpand()
    }
  }, [matches, onExpand])

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />

      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />

          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelay={isChatDelay}
            isFollowing={isFollowing}
          />
        </>
      )}

      {variant === ChatVariant.COMMUNITY && (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  )
}
