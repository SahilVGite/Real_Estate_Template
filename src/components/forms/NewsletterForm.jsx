import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ArrowRight, Check } from 'lucide-react'
import { subscribeNewsletter } from '../../services/enquiryService'
import { cn } from '../../utils/format'
import { rules } from './Field'

/** variant: "light" (on dark backgrounds) | "default" */
export default function NewsletterForm({ variant = 'default', className, compact = false }) {
  const [done, setDone] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async ({ email }) => {
    try {
      const { alreadySubscribed } = await subscribeNewsletter(email)
      if (alreadySubscribed) {
        toast.info('You’re already on the list', { description: email })
      } else {
        toast.success('You’re subscribed!', { description: 'Look out for our next market note in your inbox.' })
      }
      setDone(true)
      reset()
      setTimeout(() => setDone(false), 4000)
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  const light = variant === 'light'
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn('w-full', className)}>
      <div
        className={cn(
          'flex gap-2 rounded-md p-1.5 transition focus-within:ring-2',
          light ? 'bg-white/10 ring-white/20 focus-within:ring-beige/50' : 'border border-line bg-white focus-within:ring-navy/10',
          compact ? 'flex-row' : 'flex-col xs:flex-row',
          errors.email && 'ring-2 ring-error/50',
        )}
      >
        <label htmlFor={`newsletter-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-${variant}`}
          type="email"
          placeholder="Your email address"
          autoComplete="email"
          className={cn(
            'h-11 min-w-0 flex-1 bg-transparent px-3 text-[0.9375rem] outline-none',
            light ? 'text-white placeholder:text-white/50' : 'text-ink placeholder:text-muted',
          )}
          aria-invalid={errors.email ? 'true' : undefined}
          {...register('email', rules.email)}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[5px] px-5 text-sm font-medium transition disabled:opacity-60',
            light ? 'bg-gold text-navy hover:bg-[#c7a56b]' : 'bg-navy text-white hover:bg-navy-800',
          )}
          aria-label="Subscribe to newsletter"
        >
          {done ? <Check className="h-4 w-4" /> : compact ? <ArrowRight className="h-4 w-4" /> : null}
          {!compact && (isSubmitting ? 'Subscribing…' : done ? 'Subscribed' : 'Subscribe')}
        </button>
      </div>
      {errors.email && (
        <p className={cn('mt-2 text-[0.8125rem]', light ? 'text-[#f1a7a4]' : 'text-error-dark')} role="alert">
          {errors.email.message}
        </p>
      )}
    </form>
  )
}
