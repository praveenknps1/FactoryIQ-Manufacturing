import { STATUS_COLOR } from '../../data/mockData.js'

// Explicit literal class strings per token so Tailwind's content scanner
// picks them up (dynamic `bg-${token}` interpolation would be purged).
const TOKEN_CLASSES = {
  good: 'bg-good/15 text-good border-good/30',
  warn: 'bg-warn/15 text-warn border-warn/30',
  bad: 'bg-bad/15 text-bad border-bad/30',
  brand: 'bg-brand/15 text-brand border-brand/30',
  violet: 'bg-violet/15 text-violet border-violet/30',
  cyan: 'bg-cyan/15 text-cyan border-cyan/30',
  mid: 'bg-ink-muted/15 text-ink-muted border-ink-muted/30',
}

export default function StatusBadge({ status }) {
  const token = STATUS_COLOR[status] || 'mid'
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wide whitespace-nowrap ${TOKEN_CLASSES[token]}`}
    >
      {status}
    </span>
  )
}
