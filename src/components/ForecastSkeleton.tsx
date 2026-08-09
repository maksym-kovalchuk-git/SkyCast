import Skeleton from './Skeleton'

export default function ForecastSkeleton() {
  return (
    <div>
      <Skeleton className="h-6 w-40 my-4" />
      <div className="flex flex-col divide-y divide-white/12 bg-white/6 rounded-3xl border border-white/12">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center pl-6 pr-18 justify-between py-4">
            <div className="flex items-center gap-24">
              <Skeleton className="h-4 w-10" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-18">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
