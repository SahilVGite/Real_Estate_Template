import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { cn } from '../../utils/format'

const variants = {
  primary: 'bg-navy text-white hover:bg-navy-800 active:bg-navy-900',
  gold: 'bg-gold text-navy hover:bg-[#c7a56b] active:bg-[#a9874d]',
  outline: 'border border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white',
  ghost: 'bg-transparent text-navy hover:bg-navy/5',
  light: 'bg-white text-navy hover:bg-beige-50',
  'outline-light': 'border border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy',
  danger: 'border border-error/30 bg-transparent text-error-dark hover:bg-error hover:text-white hover:border-error',
}

const sizes = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-[0.9375rem] gap-2',
  lg: 'h-[3.25rem] px-7 text-base gap-2.5',
  icon: 'h-10 w-10 justify-center',
}

const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', loading = false, disabled, className, children, iconRight, iconLeft, ...props },
  ref,
) {
  const classes = cn(
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md font-medium tracking-[0.01em] transition-all duration-200 ease-out-soft',
    'disabled:pointer-events-none disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    variants[variant],
    sizes[size],
    className,
  )
  const content = (
    <>
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : iconLeft}
      {children}
      {!loading && iconRight}
    </>
  )

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }
  const Comp = as || 'button'
  return (
    <Comp ref={ref} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {content}
    </Comp>
  )
})

export default Button
