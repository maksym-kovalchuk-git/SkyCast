import { ErrorIcon } from '../icons'

interface ErrorMessageProps {
  message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex items-center gap-3 bg-red-500/10 border border-red-500/25 rounded-2xl px-4 py-3 text-red-200"
    >
      <ErrorIcon size={20} />
      <p className="text-sm">{message}</p>
    </div>
  )
}
