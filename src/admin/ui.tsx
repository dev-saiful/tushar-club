import type { ReactNode } from 'react'

export function PageHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {action}
    </div>
  )
}

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Field({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block mb-3">
      <span className="block text-gray-300 mb-1 text-sm">{label}</span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none'

export function StatusBadge({ status }: { status: string }) {
  const color =
    status === 'approved' || status === 'verified'
      ? 'bg-green-600'
      : status === 'rejected'
        ? 'bg-red-600'
        : 'bg-yellow-600'
  return (
    <span className={`${color} text-white text-xs px-2 py-1 rounded`}>{status}</span>
  )
}

export function PrimaryButton({
  children,
  onClick,
  type,
}: {
  children: ReactNode
  onClick?: () => void
  type?: 'submit' | 'button'
}) {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {children}
    </button>
  )
}
