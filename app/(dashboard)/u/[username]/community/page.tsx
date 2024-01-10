import { format } from 'date-fns'

import { getBlockedUsers } from '@/lib/block-service'

import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

export default async function Page() {
  const blockedUsers = await getBlockedUsers()

  const formattedData = blockedUsers.map((blockedUser) => ({
    ...blockedUser,
    userId: blockedUser.blocked.id,
    imageUrl: blockedUser.blocked.imageUrl,
    username: blockedUser.blocked.username,
    createdAt: format(new Date(blockedUser.blocked.createdAt), 'MM/dd/yyyy')
  }))

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>

      <DataTable columns={columns} data={formattedData} />
    </div>
  )
}
