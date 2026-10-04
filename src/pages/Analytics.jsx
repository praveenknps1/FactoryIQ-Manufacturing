import { AreaChart, Area, LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { SectionHeader, ChartCard, Panel } from '../components/dashboard/BasicUI.jsx'
import KpiCard from '../components/dashboard/KpiCard.jsx'
import { analyticsOTD, productionTrend, suppliers, exportReports } from '../data/mockData.js'

const tooltipStyle = { background: '#1e2433', border: '1px solid #2a3347', borderRadius: 8, color: '#f1f5f9', fontSize: 12 }
const axisTick = { fill: '#7c8ba1', fontSize: 11 }

export default function Analytics() {
  return (
    <div>
      <SectionHeader title="Analytics & Reporting" sub="Business intelligence across all operational domains" />
      <div className="mb-6 flex flex-wrap gap-3 sm:gap-3.5">
        <KpiCard label="OTD Rate" value="92%" sub="+4% vs last quarter" accent="good" icon="🎯" />
        <KpiCard label="Production Util." value="96.1%" sub="All plants avg" accent="brand" icon="🏭" />
        <KpiCard label="Quality Index" value="94.2" sub="Composite score" accent="violet" icon="📊" />
        <KpiCard label="Supplier Score" value="88.2" sub="Weighted avg" accent="warn" icon="⭐" />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="On-Time Delivery Rate (%)">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analyticsOTD}>
              <defs>
                <linearGradient id="otdg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3347" />
              <XAxis dataKey="month" tick={axisTick} />
              <YAxis domain={[80, 100]} tick={axisTick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="rate" stroke="#10b981" fill="url(#otdg)" strokeWidth={2} name="OTD %" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Production Utilization by Month">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={productionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3347" />
              <XAxis dataKey="month" tick={axisTick} />
              <YAxis domain={[88, 100]} tick={axisTick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} name="Efficiency %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Supplier Scorecard" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={suppliers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3347" />
              <XAxis dataKey="name" tick={axisTick} />
              <YAxis domain={[60, 100]} tick={axisTick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]} name="Score">
                {suppliers.map((s) => <Cell key={s.id} fill={s.score >= 90 ? '#10b981' : s.score >= 80 ? '#f59e0b' : '#ef4444'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <Panel title="Export Reports">
          {exportReports.map(([name, fmt]) => (
            <button
              key={name}
              className="mb-2 flex w-full items-center justify-between rounded-lg border border-line bg-field px-3.5 py-2.5 text-[13px] text-ink hover:bg-line/40"
            >
              <span>{name}</span>
              <span className="rounded bg-line px-2 py-0.5 text-[11px] text-ink-muted">{fmt}</span>
            </button>
          ))}
        </Panel>
      </div>
    </div>
  )
}
