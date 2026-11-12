import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { ArrowRight, CircleCheck, Footprints, Video, ShieldCheck, Lock } from 'lucide-react'
import Button from '../common/Button'
import { Field, Input, Textarea, Select, Checkbox, rules } from '../forms/Field'
import { LEAD_TYPES, BUDGETS, CALL_TIMES } from './leadTypes'
import { createLead } from '../../services/enquiryService'
import { locations } from '../../data/locations'
import { categories } from '../../data/categories'
import { cn, formatDate } from '../../utils/format'

const TIME_SLOTS = ['10:00 am', '11:30 am', '1:00 pm', '3:00 pm', '4:30 pm', '6:00 pm']
const toLocalISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function useUpcomingDays() {
  return useMemo(() => {
    const days = []
    const d = new Date()
    while (days.length < 7) {
      d.setDate(d.getDate() + 1)
      if (d.getDay() !== 0) days.push(new Date(d))
    }
    return days
  }, [])
}

/** Pill-style radio group bound to react-hook-form. */
function Pills({ legend, name, options, register, value, required, error }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">
        {legend}
        {required && <span className="text-error-dark">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o}
            className={cn(
              'cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition',
              value === o ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-navy/40',
            )}
          >
            <input type="radio" value={o} className="sr-only" {...register(name, required ? { required: 'Please choose one' } : {})} />
            {o}
          </label>
        ))}
      </div>
      {error && <p className="mt-1.5 text-[0.8125rem] text-error-dark">{error}</p>}
    </fieldset>
  )
}

/**
 * Configurable lead-capture form. Renders the fields defined for `type` in leadTypes.js,
 * shows a success state with next steps, and stores the lead via enquiryService.
 */
export default function LeadForm({ type = 'enquiry', property, source = 'website', onDone, compact = false }) {
  const config = LEAD_TYPES[type]
  const days = useUpcomingDays()
  const [lead, setLead] = useState(null)
  const isRent = property?.status === 'rent'
  const purposeOptions = isRent ? ['For my family', 'For myself', 'Company lease'] : ['To live in', 'As an investment']

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      purpose: '',
      message: property ? `Hi, I’m interested in ${property.title} in ${property.locality}. Please share more details.` : '',
      mode: 'In person',
      date: '',
      time: '',
      channel: 'WhatsApp',
      loan: false,
      callTime: CALL_TIMES[0],
      lookingFor: 'Buy',
      city: property?.city ?? '',
      propertyType: property?.type ?? '',
      budget: '',
      consent: true,
    },
  })
  const v = watch()
  const has = (f) => config.fields.includes(f)
  const emailRequired = type !== 'callback'

  const onSubmit = async (data) => {
    try {
      const payload = { type, source, name: data.name, phone: data.phone }
      config.fields.forEach((f) => {
        if (f === 'visit') Object.assign(payload, { mode: data.mode, date: data.date, time: data.time })
        else payload[f] = data[f]
      })
      if (property) Object.assign(payload, { propertyId: property.id, propertyTitle: property.title })
      const saved = await createLead(payload)
      setLead(saved)
      toast.success(config.success, { description: `Reference ${saved.id.toUpperCase()}` })
    } catch {
      toast.error('Something went wrong. Please try again or call us directly.')
    }
  }
  const onInvalid = () => toast.error('Please complete the highlighted fields')

  if (lead) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-2">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
          <CircleCheck className="h-7 w-7" strokeWidth={1.6} />
        </span>
        <h3 className="mt-4 text-2xl">Thank you, {lead.name.split(' ')[0]}!</h3>
        <p className="mt-1.5 text-muted">
          {config.success}
          {type === 'visit' && lead.date && <> for {formatDate(`${lead.date}T00:00`, { weekday: 'long', day: 'numeric', month: 'short' })} at {lead.time}</>}.
        </p>
        <ol className="mt-6 space-y-3">
          {config.next.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-[0.6875rem] font-semibold text-beige">{i + 1}</span>
              <span className="pt-0.5 text-ink">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 rounded-md bg-cream px-3 py-2 text-xs text-muted">
          Ref. {lead.id.toUpperCase()} · Demo form: saved in this browser only, nothing was sent to a server.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {onDone && <Button onClick={onDone}>Done</Button>}
          <Button
            variant="outline"
            onClick={() => {
              reset()
              setLead(null)
            }}
          >
            Submit another request
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="flex flex-col gap-4">
      {has('lookingFor') && (
        <Pills legend="I’m looking to" name="lookingFor" options={['Buy', 'Rent']} register={register} value={v.lookingFor} />
      )}

      {(has('city') || has('propertyType')) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {has('city') && (
            <Field label="Preferred city" error={errors.city?.message} required>
              {(a) => <Select {...a} placeholder="Select city" options={locations.map((l) => ({ value: l.id, label: l.name }))} {...register('city', { required: 'Select a city' })} />}
            </Field>
          )}
          {has('propertyType') && (
            <Field label="Property type">
              {(a) => <Select {...a} placeholder="Any type" options={categories.map((c) => ({ value: c.id, label: c.label }))} {...register('propertyType')} />}
            </Field>
          )}
        </div>
      )}

      {has('budget') && (
        <Field label="Budget" error={errors.budget?.message} required>
          {(a) => (
            <Select
              {...a}
              placeholder="Select budget"
              options={BUDGETS[v.lookingFor === 'Rent' ? 'rent' : 'sale'].map((b) => ({ value: b, label: b }))}
              {...register('budget', { required: 'Select a budget' })}
            />
          )}
        </Field>
      )}

      {has('visit') && (
        <>
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 'In person', icon: Footprints },
              { v: 'Video call', icon: Video },
            ].map(({ v: m, icon: Icon }) => (
              <label
                key={m}
                className={cn(
                  'flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-sm font-medium transition',
                  v.mode === m ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-navy/40',
                )}
              >
                <input type="radio" value={m} className="sr-only" {...register('mode')} />
                <Icon className="h-4 w-4" aria-hidden /> {m}
              </label>
            ))}
          </div>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">
              Choose a day<span className="text-error-dark">*</span>
            </legend>
            <input type="hidden" {...register('date', { required: 'Pick a day for your visit' })} />
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {days.map((d) => {
                const iso = toLocalISO(d)
                const active = v.date === iso
                return (
                  <button
                    type="button"
                    key={iso}
                    onClick={() => setValue('date', iso, { shouldValidate: true })}
                    aria-pressed={active}
                    className={cn('flex w-[4.1rem] shrink-0 flex-col items-center rounded-md border py-2 transition', active ? 'border-navy bg-navy text-white' : 'border-line bg-white hover:border-navy/40')}
                  >
                    <span className={cn('text-[0.6875rem] font-semibold tracking-wider uppercase', active ? 'text-beige' : 'text-muted')}>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                    <span className="font-serif text-lg leading-tight">{d.getDate()}</span>
                    <span className={cn('text-[0.6875rem]', active ? 'text-white/70' : 'text-muted')}>{d.toLocaleDateString('en-IN', { month: 'short' })}</span>
                  </button>
                )
              })}
            </div>
            {errors.date && <p className="mt-1.5 text-[0.8125rem] text-error-dark">{errors.date.message}</p>}
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-medium">
              Preferred time<span className="text-error-dark">*</span>
            </legend>
            <input type="hidden" {...register('time', { required: 'Pick a time slot' })} />
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setValue('time', t, { shouldValidate: true })}
                  aria-pressed={v.time === t}
                  className={cn('rounded-md border px-2 py-2 text-[0.8125rem] font-medium transition', v.time === t ? 'border-navy bg-navy text-white' : 'border-line bg-white hover:border-navy/40')}
                >
                  {t}
                </button>
              ))}
            </div>
            {errors.time && <p className="mt-1.5 text-[0.8125rem] text-error-dark">{errors.time.message}</p>}
          </fieldset>
        </>
      )}

      <div className={cn('grid gap-4', !compact && 'sm:grid-cols-2')}>
        <Field label="Full name" error={errors.name?.message} required className={cn(!compact && !has('email') && 'sm:col-span-2')}>
          {(a) => <Input {...a} autoComplete="name" placeholder="Your name" {...register('name', rules.name)} />}
        </Field>
        <Field label="Mobile number" error={errors.phone?.message} required className={cn(!compact && !has('email') && 'sm:col-span-2')}>
          {(a) => <Input {...a} type="tel" autoComplete="tel" placeholder="+91 98765 43210" {...register('phone', rules.phone)} />}
        </Field>
        {has('email') && (
          <Field label="Email" error={errors.email?.message} required={emailRequired} className={cn(!compact && 'sm:col-span-2')}>
            {(a) => <Input {...a} type="email" autoComplete="email" placeholder="you@email.com" {...register('email', emailRequired ? rules.email : {})} />}
          </Field>
        )}
      </div>

      {has('purpose') && <Pills legend={isRent ? 'Renting' : 'Buying'} name="purpose" options={purposeOptions} register={register} value={v.purpose} />}

      {has('channel') && <Pills legend="Send it on" name="channel" options={['WhatsApp', 'Email', 'Both']} register={register} value={v.channel} />}

      {has('callTime') && (
        <Field label="Best time to call">
          {(a) => <Select {...a} options={CALL_TIMES.map((t) => ({ value: t, label: t }))} {...register('callTime')} />}
        </Field>
      )}

      {has('message') && (
        <Field label="Message" error={errors.message?.message}>
          {(a) => <Textarea {...a} rows={3} {...register('message', { maxLength: { value: 1000, message: 'Please keep it under 1,000 characters' } })} />}
        </Field>
      )}

      {has('loan') && <Checkbox label="I’d also like a free home-loan eligibility check" {...register('loan')} />}

      <div>
        <Checkbox
          className="text-[0.8125rem] text-muted"
          label="I agree to be contacted by Abode by phone, WhatsApp or email about this request."
          {...register('consent', { required: 'Please agree to be contacted' })}
        />
        {errors.consent && <p className="mt-1 text-[0.8125rem] text-error-dark">{errors.consent.message}</p>}
      </div>

      <Button type="submit" variant={type === 'visit' ? 'gold' : 'primary'} size="lg" loading={isSubmitting} className="w-full" iconRight={<ArrowRight className="h-4 w-4" />}>
        {isSubmitting ? 'Submitting…' : config.cta}
      </Button>
      <p className="flex items-center justify-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <Lock className="h-3.5 w-3.5" /> Your details stay private
        </span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5" /> No spam, ever
        </span>
      </p>
    </form>
  )
}
