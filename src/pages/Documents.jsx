import { useState } from 'react'
import { SectionHeader, Panel, DataTable } from '../components/dashboard/BasicUI.jsx'
import KpiCard from '../components/dashboard/KpiCard.jsx'
import StatusBadge from '../components/dashboard/StatusBadge.jsx'
import { documents } from '../data/mockData.js'

export default function Documents() {
  const [filter, setFilter] = useState('All')
  const types = ['All', ...new Set(documents.map((d) => d.type))]
  const filtered = filter === 'All' ? documents : documents.filter((d) => d.type === filter)

  const columns = [
    { key: 'id', header: 'Doc ID', mono: true },
    { key: 'name', header: 'Name', render: (r) => <span className="font-semibold text-ink-hi">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => <span className="rounded-md bg-line px-2 py-0.5 text-[11px] text-ink-mid">{r.type}</span> },
    { key: 'project', header: 'Project' },
    { key: 'version', header: 'Version', mono: true },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'date', header: 'Date', mono: true },
    { key: 'size', header: 'Size' },
  ]

  return (
    <div>
      <SectionHeader title="Documents & Collaboration" sub="Version-controlled repository for specs, CAD, reports, and compliance" />
      <div className="mb-6 flex flex-wrap gap-3 sm:gap-3.5">
        <KpiCard label="Total Documents" value={documents.length} accent="brand" icon="📄" />
        <KpiCard label="Approved" value={documents.filter((d) => d.status === 'Approved').length} accent="good" icon="✅" />
        <KpiCard label="In Review" value={documents.filter((d) => d.status === 'In Review').length} accent="warn" icon="🔍" />
        <KpiCard label="Drafts" value={documents.filter((d) => d.status === 'Draft').length} accent="cyan" icon="✏️" />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === t ? 'border-brand bg-brand text-white' : 'border-line bg-card text-ink-muted hover:text-ink-hi'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Panel>
        <DataTable columns={columns} rows={filtered} />
      </Panel>
    </div>
  )
}
