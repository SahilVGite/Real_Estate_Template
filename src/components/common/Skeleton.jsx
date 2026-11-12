import { cn } from '../../utils/format'

export default function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-md bg-[#ece9e3]', className)} aria-hidden />
}
