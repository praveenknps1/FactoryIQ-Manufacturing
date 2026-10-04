import { SectionHeader, Panel, DataTable } from '../components/dashboard/BasicUI.jsx'
import KpiCard from '../components/dashboard/KpiCard.jsx'
import StatusBadge from '../components/dashboard/StatusBadge.jsx'
import { rmas } from '../data/mockData.js'

export default function AfterSales() {
  const columns = [
    { key: 'id', header: 'RMA #', mono: true },
    { key: 'product', header: 'Product', render: (r) => <span className="font-semibold text-ink-hi">{r.product}</span> },
    { key: 'issue', header: 'Issue' },
    {
      key: 'warranty',
      header: 'Warranty',
      render: (r) => <span className={`text-xs font-semibold ${r.warranty === 'In Warranty' ? 'text-good' : 'text-bad'}`}>{r.warranty}</span>,
    },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'technician', header: 'Technician' },
    { key: 'customer', header: 'Customer' },
    { key: 'date', header: 'Date', mono: true },
  ]

  return (
    <div>
      <SectionHeader title="After-Sales Service" sub="RMA management, warranty claims, and repair tracking" />
      <div className="mb-6 flex flex-wrap gap-3 sm:gap-3.5">
        <KpiCard label="Open RMAs" value={rmas.filter((r) => r.status !== 'Complete').length} accent="bad" icon="📥" />
        <KpiCard label="Completed" value={rmas.filter((r) => r.status === 'Complete').length} accent="good" icon="✅" />
        <KpiCard label="Warranty Claims" value={rmas.filter((r) => r.warranty === 'In Warranty').length} accent="brand" icon="🛡️" />
        <KpiCard label="Avg Repair Time" value="4.2 days" accent="violet" icon="⏱️" />
      </div>

      <Panel title="RMA Register">
        <DataTable columns={columns} rows={rmas} />
      </Panel>
    </div>
  )
}
