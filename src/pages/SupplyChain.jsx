import { SectionHeader, Panel, DataTable, ProgressBar } from '../components/dashboard/BasicUI.jsx'
import KpiCard from '../components/dashboard/KpiCard.jsx'
import StatusBadge from '../components/dashboard/StatusBadge.jsx'
import { suppliers, inventory } from '../data/mockData.js'

export default function SupplyChain() {
  const supplierColumns = [
    { key: 'id', header: 'Supplier ID', mono: true },
    { key: 'name', header: 'Name', render: (r) => <span className="font-semibold text-ink-hi">{r.name}</span> },
    { key: 'country', header: 'Country' },
    { key: 'po', header: 'PO Number', mono: true },
    { key: 'leadTime', header: 'Lead Time' },
    {
      key: 'score',
      header: 'Score',
      render: (r) => (
        <span className={`font-extrabold ${r.score >= 90 ? 'text-good' : r.score >= 80 ? 'text-warn' : 'text-bad'}`}>{r.score}</span>
      ),
    },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ]

  const inventoryColumns = [
    { key: 'item', header: 'Item', render: (r) => <span className="text-ink-hi">{r.item}</span> },
    { key: 'stock', header: 'Stock', render: (r) => <span className="mono">{r.stock.toLocaleString()}</span> },
    { key: 'unit', header: 'Unit' },
    { key: 'location', header: 'Location' },
    { key: 'min', header: 'Min', render: (r) => <span className="mono">{r.min.toLocaleString()}</span> },
    { key: 'max', header: 'Max', render: (r) => <span className="mono">{r.max.toLocaleString()}</span> },
    {
      key: 'level',
      header: 'Level',
      render: (r) => {
        const pct = Math.min(100, (r.stock / r.max) * 100)
        const tone = r.stock < r.min ? 'bad' : r.stock < r.min * 1.5 ? 'warn' : 'good'
        const cls = { bad: 'text-bad', warn: 'text-warn', good: 'text-good' }[tone]
        return (
          <div className="flex items-center gap-2">
            <ProgressBar pct={pct} tone={tone} />
            <span className={`text-[11px] font-bold ${cls}`}>{Math.round(pct)}%</span>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <SectionHeader title="Supply Chain & Materials" sub="Supplier performance, inventory levels, and logistics tracking" />
      <div className="mb-6 flex flex-wrap gap-3 sm:gap-3.5">
        <KpiCard label="Active Suppliers" value={suppliers.length} accent="brand" icon="🤝" />
        <KpiCard label="On-Time Delivery" value="80%" accent="good" icon="🚚" />
        <KpiCard label="Delayed POs" value={suppliers.filter((s) => s.status === 'Delayed').length} accent="bad" icon="📦" />
        <KpiCard label="Low Stock Items" value={inventory.filter((i) => i.stock < i.min * 1.2).length} accent="warn" icon="⚠️" />
      </div>

      <Panel title="Supplier Status" className="mb-4">
        <DataTable columns={supplierColumns} rows={suppliers} />
      </Panel>

      <Panel title="Inventory Levels">
        <DataTable columns={inventoryColumns} rows={inventory} keyField="item" />
      </Panel>
    </div>
  )
}
