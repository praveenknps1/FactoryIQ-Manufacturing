export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-muted">
      <span className="relative flex h-8 w-8">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-30" />
        <span className="relative inline-flex h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      </span>
      <span className="mono text-xs">{label}</span>
    </div>
  )
}
