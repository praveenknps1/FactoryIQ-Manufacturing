import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { SectionHeader, DataTable, ProgressBar, Panel } from '../components/dashboard/BasicUI.jsx'
import KpiCard from '../components/dashboard/KpiCard.jsx'
import StatusBadge from '../components/dashboard/StatusBadge.jsx'
import { projects, milestones, bom, changeLog } from '../data/mockData.js'

const STATUS_HEX = { 'On Track': '#10b981', Risk: '#f59e0b', Delayed: '#ef4444', Complete: '#10b981', 'In Progress': '#3b82f6', Pending: '#94a3b8' }

function ProjectDetail({ id, onBack }) {
  const proj = projects.find((p) => p.id === id)
  const pm = milestones.filter((m) => m.project === id)

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-3.5 py-2 text-xs font-semibold text-ink-muted hover:text-ink-hi"
      >
        <ArrowLeft size={13} /> Back to Projects
      </button>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-ink-hi">{proj.name}</h2>
          <p className="mt-1 text-xs sm:text-sm text-ink-muted">{proj.id} · {proj.site} · Owner: {proj.owner}</p>
        </div>
        <StatusBadge status={proj.status} />
      </div>

      <div className="mb-6 flex flex-wrap gap-3 sm:gap-3.5">
        <KpiCard label="Stage" value={proj.stage} accent="brand" icon="📍" />
        <KpiCard label="Progress" value={`${proj.progress}%`} accent="good" icon="📈" />
        <KpiCard label="Customer" value={proj.customer} accent="violet" icon="🏢" />
        <KpiCard label="End Date" value={proj.endDate} accent="warn" icon="📅" />
      </div>

      <Panel title="Milestones Timeline" className="mb-5">
        <div className="flex gap-0 overflow-x-auto pb-2 no-scrollbar">
          {pm.map((m, i) => (
            <div key={m.id} className="flex items-center">
              <div className="min-w-[120px] text-center">
                <div
                  className="mx-auto mb-2 h-6 w-6 rounded-full border-[3px] border-base"
                  style={{ background: STATUS_HEX[m.status] || '#94a3b8' }}
                />
                <p className="text-xs font-bold text-ink-hi">{m.name}</p>
                <p className="mt-0.5 text-[11px] text-ink-faint">{m.date}</p>
                <div className="mt-1 flex justify-center"><StatusBadge status={m.status} /></div>
              </div>
              {i < pm.length - 1 && <div className="-mt-6 h-0.5 w-12 bg-line" />}
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel title="Engineering BOM (Sample)">
          {bom.map(([n, id2, qty]) => (
            <div key={id2} className="flex items-center justify-between border-b border-line2 py-2 text-[13px] last:border-0">
              <span className="text-ink">{n}</span>
              <span className="mono text-ink-muted">{id2}</span>
              <span className="text-ink-mid">{qty}</span>
            </div>
          ))}
        </Panel>
        <Panel title="Change Log">
          {changeLog.map(([msg, date]) => (
            <div key={date} className="border-b border-line2 py-2 last:border-0">
              <p className="text-[13px] text-ink">{msg}</p>
              <p className="mt-0.5 text-[11px] text-ink-faint">{date}</p>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  )
}

export default function Projects({ role }) {
  const [selected, setSelected] = useState(null)
  if (selected) return <ProjectDetail id={selected} onBack={() => setSelected(null)} />

  const rows = role === 'Customer' ? projects.filter((p) => p.customer === 'AutoCorp') : projects

  const columns = [
    { key: 'id', header: 'Project ID', mono: true },
    { key: 'name', header: 'Name', render: (r) => <span className="font-semibold text-ink-hi">{r.name}</span> },
    { key: 'owner', header: 'Owner' },
    { key: 'site', header: 'Site' },
    {
      key: 'stage',
      header: 'Stage',
      render: (r) => <span className="rounded-md bg-line px-2 py-0.5 text-[11px] text-ink-mid">{r.stage}</span>,
    },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'progress',
      header: 'Progress',
      render: (r) => (
        <div className="flex items-center gap-2">
          <ProgressBar pct={r.progress} tone={r.status === 'Delayed' ? 'bad' : r.status === 'Risk' ? 'warn' : 'good'} />
          <span className="mono text-xs text-ink-mid">{r.progress}%</span>
        </div>
      ),
    },
    {
      key: 'view',
      header: '',
      render: (r) => (
        <button onClick={() => setSelected(r.id)} className="rounded-md bg-line px-3 py-1 text-xs font-semibold text-brand hover:bg-line/70">
          View →
        </button>
      ),
    },
  ]

  return (
    <div>
      <SectionHeader title="Program & Project Tracking" sub="Full lifecycle from R&D through production launch" />
      <div className="mb-6 flex flex-wrap gap-3 sm:gap-3.5">
        <KpiCard label="Total Projects" value={projects.length} accent="brand" icon="📁" />
        <KpiCard label="On Track" value={projects.filter((p) => p.status === 'On Track').length} accent="good" icon="✅" />
        <KpiCard label="At Risk" value={projects.filter((p) => p.status === 'Risk').length} accent="warn" icon="⚡" />
        <KpiCard label="Delayed" value={projects.filter((p) => p.status === 'Delayed').length} accent="bad" icon="🚨" />
      </div>
      <Panel>
        <DataTable columns={columns} rows={rows} />
      </Panel>
    </div>
  )
}
