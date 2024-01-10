import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { Results, ResultsSkeleton } from './_components/results'

interface SearchPageProps {
  searchParams: {
    term?: string
  }
}

export default function Page({ searchParams }: SearchPageProps) {
  if (!searchParams.term) {
    redirect('/')
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
    </div>
  )
}
