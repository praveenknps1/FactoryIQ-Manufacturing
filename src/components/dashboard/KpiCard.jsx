const ACCENTS = {
  brand: { chip: 'bg-brand/15 text-brand', bar: 'bg-brand' },
  good: { chip: 'bg-good/15 text-good', bar: 'bg-good' },
  warn: { chip: 'bg-warn/15 text-warn', bar: 'bg-warn' },
  bad: { chip: 'bg-bad/15 text-bad', bar: 'bg-bad' },
  violet: { chip: 'bg-violet/15 text-violet', bar: 'bg-violet' },
  cyan: { chip: 'bg-cyan/15 text-cyan', bar: 'bg-cyan' },
}

export default function KpiCard({ label, value, sub, accent = 'brand', icon }) {
  const cfg = ACCENTS[accent] || ACCENTS.brand
  return (
    <div className="flex-1 min-w-[150px] rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-ink-muted mb-1.5">{label}</p>
          <p className="mono text-xl sm:text-[28px] font-extrabold leading-none text-ink-hi truncate">{value}</p>
          {sub && <p className="text-[11px] sm:text-xs text-ink-muted mt-1.5">{sub}</p>}
        </div>
        {icon && (
          <span className={`shrink-0 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-[10px] text-base sm:text-lg ${cfg.chip}`}>
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 h-[3px] rounded-full bg-line overflow-hidden">
        <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: '65%' }} />
      </div>
    </div>
  )
}
