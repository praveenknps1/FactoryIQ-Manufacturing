/**
 * Small shared UI primitives reused across every module page.
 */

export function SectionHeader({ title, sub, actions }) {
  return (
    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-lg sm:text-xl font-extrabold text-ink-hi">{title}</h2>
        {sub && <p className="mt-1 text-xs sm:text-sm text-ink-muted">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-line bg-card p-4 sm:p-5 ${className}`}>
      <p className="mb-3.5 text-[11px] font-bold uppercase tracking-wider text-ink-mid">{title}</p>
      {children}
    </div>
  )
}

export function Panel({ title, actions, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-line bg-card p-4 sm:p-5 ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-2">
          {title && <p className="text-[11px] font-bold uppercase tracking-wider text-ink-mid">{title}</p>}
          {actions}
        </div>
      )}
      {children}
    </div>
  )
}

export function ProgressBar({ pct, tone = 'brand', width = 80 }) {
  const barCls = { brand: 'bg-brand', good: 'bg-good', warn: 'bg-warn', bad: 'bg-bad' }[tone]
  return (
    <div className="h-1.5 rounded-full bg-line overflow-hidden" style={{ width }}>
      <div className={`h-full rounded-full ${barCls}`} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
    </div>
  )
}

export function DataTable({ columns, rows, keyField = 'id' }) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[640px] border-collapse text-[13px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="whitespace-nowrap border-b border-line px-3.5 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-ink-muted"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[keyField]} className="border-b border-line2 last:border-0">
              {columns.map((col) => (
                <td key={col.key} className={`px-3.5 py-2.5 align-middle whitespace-nowrap ${col.mono ? 'mono text-xs text-ink-mid' : 'text-ink'}`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
