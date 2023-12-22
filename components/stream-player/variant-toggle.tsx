'use client'

import { MessageSquare, Users } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'

export function VariantToggle() {
  const { variant, onChangeVariant } = useChatSidebar((state) => state)

  const isChat = variant === ChatVariant.CHAT

  const Icon = isChat ? Users : MessageSquare
  const label = isChat ? 'Community' : 'Go back to chat'

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    onChangeVariant(newVariant)
  }

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  )
}
