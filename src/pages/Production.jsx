import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { SectionHeader, ChartCard, Panel, DataTable } from '../components/dashboard/BasicUI.jsx'
import KpiCard from '../components/dashboard/KpiCard.jsx'
import StatusBadge from '../components/dashboard/StatusBadge.jsx'
import { productionLines } from '../data/mockData.js'

const tooltipStyle = { background: '#1e2433', border: '1px solid #2a3347', borderRadius: 8, color: '#f1f5f9', fontSize: 12 }
const axisTick = { fill: '#7c8ba1', fontSize: 11 }

export default function Production() {
  const columns = [
    { key: 'line', header: 'Line' },
    { key: 'shift', header: 'Shift' },
    { key: 'planned', header: 'Planned', render: (r) => <span className="mono">{r.planned.toLocaleString()}</span> },
    { key: 'actual', header: 'Actual', render: (r) => <span className="mono">{r.actual.toLocaleString()}</span> },
    {
      key: 'yield',
      header: 'Yield %',
      render: (r) => (
        <span className={`mono font-bold ${r.yield < 92 ? 'text-bad' : r.yield > 98 ? 'text-good' : 'text-warn'}`}>{r.yield}%</span>
      ),
    },
    { key: 'rework', header: 'Rework' },
    {
      key: 'status',
      header: 'Status',
      render: (r) => <StatusBadge status={r.efficiency >= 95 ? 'On Track' : r.efficiency >= 90 ? 'Risk' : 'Delayed'} />,
    },
  ]

  return (
    <div>
      <SectionHeader title="Production Visibility" sub="Multi-site real-time production monitoring" />
      <div className="mb-6 flex flex-wrap gap-3 sm:gap-3.5">
        <KpiCard label="Today's Output" value="5,055" sub="units across all lines" accent="brand" icon="📦" />
        <KpiCard label="Planned" value="5,300" sub="units today" accent="cyan" icon="📋" />
        <KpiCard label="Avg Yield" value="94.9%" sub="+1.3% vs yesterday" accent="good" icon="📊" />
        <KpiCard label="Total Rework" value="125" sub="units flagged" accent="warn" icon="🔄" />
        <KpiCard label="Downtime" value="1.4h" sub="Machine stops" accent="bad" icon="⏸️" />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <ChartCard title="Production by Line (Planned vs Actual)" className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productionLines}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3347" />
              <XAxis dataKey="line" tick={axisTick} />
              <YAxis tick={axisTick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: '#7c8ba1', fontSize: 12 }} />
              <Bar dataKey="planned" fill="#2a3347" radius={[4, 4, 0, 0]} name="Planned" />
              <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Rework Units by Line" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productionLines} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3347" />
              <XAxis type="number" tick={axisTick} />
              <YAxis dataKey="line" type="category" tick={axisTick} width={50} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="rework" fill="#ef4444" radius={[0, 4, 4, 0]} name="Rework Units" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Panel title="Line-by-Line Breakdown">
        <DataTable columns={columns} rows={productionLines} keyField="line" />
      </Panel>
    </div>
  )
}
