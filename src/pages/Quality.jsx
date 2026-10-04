import { BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { SectionHeader, ChartCard, Panel, DataTable } from '../components/dashboard/BasicUI.jsx'
import KpiCard from '../components/dashboard/KpiCard.jsx'
import StatusBadge from '../components/dashboard/StatusBadge.jsx'
import { qualityIssues, defectData, auditData } from '../data/mockData.js'

const tooltipStyle = { background: '#1e2433', border: '1px solid #2a3347', borderRadius: 8, color: '#f1f5f9', fontSize: 12 }
const axisTick = { fill: '#7c8ba1', fontSize: 11 }
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']
const SEVERITY_CLS = { High: 'text-bad', Medium: 'text-warn', Low: 'text-good' }

export default function Quality() {
  const columns = [
    { key: 'id', header: 'Issue ID', mono: true },
    { key: 'problem', header: 'Problem', render: (r) => <span className="text-ink-hi">{r.problem}</span> },
    { key: 'rootCause', header: 'Root Cause' },
    { key: 'severity', header: 'Severity', render: (r) => <span className={`text-xs font-bold ${SEVERITY_CLS[r.severity]}`}>{r.severity}</span> },
    { key: 'status', header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'owner', header: 'Owner' },
    { key: 'date', header: 'Date', mono: true },
  ]

  return (
    <div>
      <SectionHeader title="Quality Management & Compliance" sub="NCR tracking, audits, SPC analytics, and ISO compliance" />
      <div className="mb-6 flex flex-wrap gap-3 sm:gap-3.5">
        <KpiCard label="Open Issues" value={qualityIssues.filter((q) => q.status === 'Open').length} accent="bad" icon="🚨" />
        <KpiCard label="In Progress" value={qualityIssues.filter((q) => q.status === 'In Progress').length} accent="warn" icon="⚙️" />
        <KpiCard label="Resolved" value={qualityIssues.filter((q) => q.status === 'Closed').length} accent="good" icon="✅" />
        <KpiCard label="Audit Score" value="94.2" sub="ISO 9001 Compliance" accent="violet" icon="🏅" />
        <KpiCard label="Defect Rate" value="2.1%" sub="-0.4% this month" accent="cyan" icon="📉" />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Top Defect Types">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={defectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3347" />
              <XAxis dataKey="name" tick={axisTick} />
              <YAxis tick={axisTick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Count">
                {defectData.map((d, i) => <Cell key={d.name} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Monthly Audit Score Trend">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={auditData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3347" />
              <XAxis dataKey="month" tick={axisTick} />
              <YAxis domain={[80, 100]} tick={axisTick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} name="Score" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Panel title="NCR / CAPA Register">
        <DataTable columns={columns} rows={qualityIssues} />
      </Panel>
    </div>
  )
}
