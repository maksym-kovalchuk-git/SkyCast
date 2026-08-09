import Skeleton from './Skeleton'

export default function WeatherCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-5">
      <div className="h-57 bg-white/6 rounded-3xl border border-white/12 shadow-sm p-8 flex flex-col">
        <Skeleton className="h-4 w-24 mb-4" />
        <div className="flex flex-col justify-between flex-1">
          <Skeleton className="h-8 w-48" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-32" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-57 bg-white/6 rounded-3xl border border-white/12 shadow-sm p-7 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex flex-col gap-3 border-t border-white/12 pt-4 mt-auto">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  )
}
