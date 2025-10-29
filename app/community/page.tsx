import { Suspense } from "react"

export default function CommunityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Community Page - Coming Soon</div>
    </Suspense>
  )
}
