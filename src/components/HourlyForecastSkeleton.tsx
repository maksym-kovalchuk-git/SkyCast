import Skeleton from './Skeleton'

export default function HourlyForecastSkeleton() {
  return (
    <div>
      <Skeleton className="h-6 w-40 my-3" />
      <div className="flex gap-4 overflow-hidden pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 w-32 p-4 bg-white/6 border border-white/12 rounded-2xl shadow-sm flex flex-col items-center gap-2"
          >
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-14" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </div>
  )
}
