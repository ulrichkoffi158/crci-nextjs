import { AlertCircle } from 'lucide-react'

export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  )
}

export const inputCls = (hasError?: boolean) =>
  `w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/15 text-sm transition-colors ${hasError ? 'border-red-400 focus:border-red-500' : 'border-navy-100 focus:border-navy'}`

/** Champ caché anti-robots */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
      <label>Ne pas remplir<input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} name="website" /></label>
    </div>
  )
}
