import { useState, useRef, useEffect } from 'react'
import { Search, Bell, AlertTriangle, AlertOctagon, CheckCircle2, Info } from 'lucide-react'
import { ROLES, notifications } from '../../data/mockData.js'

const ICONS = { error: AlertOctagon, warning: AlertTriangle, success: CheckCircle2, info: Info }
const TONE = { error: 'text-bad', warning: 'text-warn', success: 'text-good', info: 'text-brand' }

export default function Topbar({ role, setRole, search, setSearch }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="sticky top-0 z-20 flex items-center gap-2 sm:gap-4 border-b border-line bg-surface px-3 sm:px-6 py-2.5 sm:py-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-line bg-card px-3 py-2 max-w-[420px]">
        <Search size={15} className="shrink-0 text-ink-faint" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects, docs, issues, suppliers…"
          className="min-w-0 flex-1 bg-transparent text-[13px] text-ink placeholder:text-ink-faint outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Notifications"
            className="relative flex items-center justify-center rounded-lg border border-line bg-card px-2.5 py-2 text-ink-muted hover:text-ink-hi"
          >
            <Bell size={17} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-surface bg-bad" />
          </button>
          {open && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-[85vw] max-w-[320px] rounded-xl border border-line bg-card shadow-pop">
              <div className="border-b border-line px-4 py-3 text-sm font-bold text-ink-hi">Notifications</div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => {
                  const Icon = ICONS[n.type]
                  return (
                    <div key={n.id} className="flex gap-2.5 border-b border-line2 px-4 py-3 last:border-0">
                      <Icon size={16} className={`mt-0.5 shrink-0 ${TONE[n.type]}`} />
                      <div className="min-w-0">
                        <p className="text-xs text-ink">{n.message}</p>
                        <p className="mt-1 text-[11px] text-ink-faint">{n.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-line bg-card px-2 sm:px-3 py-2 text-xs font-semibold text-ink-mid outline-none cursor-pointer"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
