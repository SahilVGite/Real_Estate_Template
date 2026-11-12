import { cn } from '../../utils/format'

export default function EmptyState({ icon: Icon, title, description, action, className, titleAs: Title = 'h3' }) {
  return (
    <div className={cn('flex flex-col items-center rounded-lg border border-dashed border-[#d9d4ca] bg-white px-6 py-14 text-center sm:py-20', className)}>
      {Icon && (
        <span className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-beige-50 text-gold-dark">
          <Icon className="h-6 w-6" strokeWidth={1.6} />
        </span>
      )}
      <Title className="text-2xl">{title}</Title>
      {description && <p className="mt-2 max-w-md text-muted">{description}</p>}
      {action && <div className="mt-7 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  )
}
