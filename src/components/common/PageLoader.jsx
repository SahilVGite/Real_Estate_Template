export default function PageLoader() {
  return (
    <div className="grid min-h-[70vh] place-items-center" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-gold" />
        <span className="text-sm text-muted">Loading…</span>
      </div>
    </div>
  )
}
