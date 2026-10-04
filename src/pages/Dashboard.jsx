import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, Line,
} from 'recharts'
import { SectionHeader, ChartCard } from '../components/dashboard/BasicUI.jsx'
import KpiCard from '../components/dashboard/KpiCard.jsx'
import { projects, productionTrend, auditData, supplierRadar, rmas } from '../data/mockData.js'

const tooltipStyle = { background: '#1e2433', border: '1px solid #2a3347', borderRadius: 8, color: '#f1f5f9', fontSize: 12 }
const axisTick = { fill: '#7c8ba1', fontSize: 11 }
const STATUS_HEX = { 'On Track': '#10b981', Risk: '#f59e0b', Delayed: '#ef4444' }

export default function Dashboard({ role }) {
  const statusCounts = projects.reduce((a, p) => { a[p.status] = (a[p.status] || 0) + 1; return a }, {})
  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

  return (
    <div>
      <SectionHeader title="Executive Dashboard" sub="Real-time overview of portfolio health and operational KPIs" />

      <div className="mb-6 flex flex-wrap gap-3 sm:gap-3.5">
        <KpiCard label="Total Projects" value={projects.length} sub="Across all sites" accent="brand" icon="📁" />
        <KpiCard label="Active Projects" value={projects.filter((p) => p.status !== 'Delayed').length} sub="+2 this quarter" accent="good" icon="✅" />
        <KpiCard label="Delayed" value={projects.filter((p) => p.status === 'Delayed').length} sub="Requires attention" accent="bad" icon="⚠️" />
        <KpiCard label="Production Eff." value="96.1%" sub="vs 94.8% last month" accent="warn" icon="🏭" />
        <KpiCard label="Quality Score" value="94.2" sub="Audit avg. (0-100)" accent="violet" icon="🎯" />
        <KpiCard label="Open RMAs" value={rmas.filter((r) => r.status !== 'Complete').length} sub="2 high priority" accent="cyan" icon="🔧" />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Project Status Distribution">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {pieData.map((d) => <Cell key={d.name} fill={STATUS_HEX[d.name] || '#7c8ba1'} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Production Output Trend (6 Months)">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={productionTrend}>
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3347" />
              <XAxis dataKey="month" tick={axisTick} />
              <YAxis tick={axisTick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="url(#pg)" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="planned" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Planned" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Quality Audit Score Trend">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={auditData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3347" />
              <XAxis dataKey="month" tick={axisTick} />
              <YAxis domain={[80, 100]} tick={axisTick} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} name="Audit Score" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Supplier Performance Radar">
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={supplierRadar}>
              <PolarGrid stroke="#2a3347" />
              <PolarAngleAxis dataKey="subject" tick={axisTick} />
              <Radar name="Score" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
