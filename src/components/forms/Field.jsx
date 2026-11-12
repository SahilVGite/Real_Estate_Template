import { forwardRef, useId, useState } from 'react'
import { ChevronDown, CircleAlert, Eye, EyeOff } from 'lucide-react'
import { cn } from '../../utils/format'

/** Label + control + hint/error wrapper. Passes ids and aria wiring to the child via render prop. */
export function Field({ label, error, hint, required, className, children, labelAction }) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <div className="flex items-center justify-between gap-2">
          <label htmlFor={id} className="text-sm font-medium text-ink">
            {label}
            {required && <span className="ml-0.5 text-error-dark" aria-hidden>*</span>}
          </label>
          {labelAction}
        </div>
      )}
      {children({ id, 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': describedBy })}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-[0.8125rem] text-error-dark" role="alert">
          <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export const Input = forwardRef(function Input({ className, icon: Icon, ...props }, ref) {
  if (!Icon) return <input ref={ref} className={cn('field-input h-11', className)} {...props} />
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
      <input ref={ref} className={cn('field-input h-11 pl-10', className)} {...props} />
    </div>
  )
})

export const PasswordInput = forwardRef(function PasswordInput({ className, ...props }, ref) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input ref={ref} type={show ? 'text' : 'password'} className={cn('field-input h-11 pr-11', className)} {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute top-1/2 right-1.5 grid h-8 w-8 -translate-y-1/2 place-items-center rounded text-muted transition hover:text-navy"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
})

export const Textarea = forwardRef(function Textarea({ className, rows = 4, ...props }, ref) {
  return <textarea ref={ref} rows={rows} className={cn('field-input resize-y leading-relaxed', className)} {...props} />
})

export const Select = forwardRef(function Select({ className, options = [], placeholder, children, ...props }, ref) {
  return (
    <div className="relative">
      <select ref={ref} className={cn('field-input h-11 cursor-pointer appearance-none pr-10', className)} {...props}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
    </div>
  )
})

export const Checkbox = forwardRef(function Checkbox({ label, className, ...props }, ref) {
  return (
    <label className={cn('inline-flex cursor-pointer items-start gap-2.5 text-sm text-ink select-none', className)}>
      <input ref={ref} type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm border-line accent-navy" {...props} />
      <span>{label}</span>
    </label>
  )
})

/** Shared validation rules for react-hook-form. */
export const rules = {
  name: { required: 'Please enter your name', minLength: { value: 2, message: 'Name looks too short' } },
  email: {
    required: 'Please enter your email',
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Enter a valid email address' },
  },
  phone: {
    required: 'Please enter your phone number',
    pattern: { value: /^[+]?[\d\s()-]{8,16}$/, message: 'Enter a valid phone number' },
  },
  phoneOptional: { pattern: { value: /^[+]?[\d\s()-]{8,16}$/, message: 'Enter a valid phone number' } },
  password: { required: 'Please enter a password', minLength: { value: 8, message: 'Use at least 8 characters' } },
}
