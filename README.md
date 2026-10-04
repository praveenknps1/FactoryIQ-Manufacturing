# FactoryIQ — Manufacturing Excellence Portal

A responsive React + Tailwind dashboard matching the requirements doc's
modules — Program/Project Tracking, Production Visibility, Quality &
Compliance, Supply Chain, After-Sales, Documents & Knowledge, and Analytics —
built in a dark, data-dense operations-console style.

## Stack
- React 18 + React Router 6
- Tailwind CSS (dark theme: base `#0f1623`, cards `#1e2433`, borders `#2a3347`,
  brand blue `#3b82f6`, plus good/warn/bad/violet/cyan status colors)
- Recharts (pie, area, bar, line, radar)
- lucide-react icons, DM Sans + IBM Plex Mono type

## Getting started
```bash
npm install
npm run dev
```
Open the URL Vite prints (default `http://localhost:5173`). Sign in with any
role on the login screen — Admin, Manager, Engineer, or Customer — to explore
role-based navigation.

Production build:
```bash
npm run build
npm run preview
```

## Structure
```
src/
├── assets/
├── data/
│   └── mockData.js          # all sample data in one place — swap for real
│                              ERP/MES/PLM/QMS/WMS integrations here
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx       # icon-only rail on mobile, labeled on desktop
│   │   └── Topbar.jsx        # search, notifications bell, role switcher
│   ├── dashboard/
│   │   ├── BasicUI.jsx       # SectionHeader, ChartCard, Panel, ProgressBar, DataTable
│   │   ├── KpiCard.jsx
│   │   └── StatusBadge.jsx
│   └── common/
│       ├── Loader.jsx
│       └── Button.jsx
├── pages/
│   ├── Login.jsx             # role-based demo sign-in gate
│   ├── Dashboard.jsx         # executive KPIs, portfolio health, trends
│   ├── Projects.jsx          # project table with drill-down (milestones, BOM, change log)
│   ├── Production.jsx        # line-by-line output, yield, rework
│   ├── Quality.jsx           # NCR/CAPA register, defect pareto, audit trend
│   ├── SupplyChain.jsx       # supplier scorecards, inventory levels
│   ├── AfterSales.jsx        # RMA register, warranty status
│   ├── Documents.jsx         # filterable document library
│   └── Analytics.jsx         # OTD trend, utilization, supplier scorecard, exports
├── App.jsx                   # auth/role state + route shell
├── main.jsx
└── index.css
```

## Responsive behavior
- **Sidebar**: a narrow **64px icon-only rail** on mobile/tablet (no overlay
  drawer) so page content keeps most of the screen width; expands to a
  **220px labeled column** at the `lg` breakpoint (1024px+).
- **Topbar**: search field shrinks fluidly, notification bell opens a
  right-aligned dropdown sized to the viewport, role switcher stays compact.
- **KPI cards**: wrap via flexbox, 2 per row on phones, up to 6 across on
  wide desktop screens.
- **Charts**: all use Recharts `ResponsiveContainer`, so they resize fluidly
  from 360px phones up through large desktop monitors.
- **Tables**: scroll horizontally within their card on narrow viewports
  instead of squeezing/breaking columns.
- **Project drill-down**: milestone timeline scrolls horizontally on small
  screens; BOM/change-log panels stack to a single column below `lg`.

## Role-based navigation
- **Customer** — Dashboard, Projects, After-Sales only.
- **Engineer** — everything except Analytics.
- **Admin / Manager** — full navigation.

Switch roles from the login screen or the selector in the top bar.
