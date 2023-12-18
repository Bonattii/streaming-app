'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/use-sidebar'

export function Toggle() {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state)

  const label = collapsed ? 'Expand' : 'Collapse'

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>

          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-w ml-auto"
              variant="ghost"
            >
              <ArrowLeftFromLine className="w-4 h-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}
