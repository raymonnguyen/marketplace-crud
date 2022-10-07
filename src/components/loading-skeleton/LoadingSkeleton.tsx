import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const SkeletonItem = () => {
  return (
    <div className="space-y-3">
      <div>
        <Skeleton height={50} />
      </div>
      <div>
        <Skeleton count={5} />
      </div>
    </div>
  )
}

const LoadingSkeleton = () => (
  <div className="space-y-7">
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </div>
)
export default LoadingSkeleton
