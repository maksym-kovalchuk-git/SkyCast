import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  icon?: ReactNode
  children: ReactNode
}

export default function StatCard({ label, icon, children }: StatCardProps) {
  return (
    <div className="bg-white/6 border border-white/12 rounded-2xl p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-wide">
        {icon}
        <span>{label}</span>
      </div>
      {children}
    </div>
  )
}
