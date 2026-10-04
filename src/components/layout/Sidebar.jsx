import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FolderKanban, Factory, Target, Truck, Wrench, FileText, BarChart3, LogOut,
} from 'lucide-react'

export const NAV = [
  { id: 'dashboard', to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { id: 'projects', to: '/projects', label: 'Projects', icon: FolderKanban },
  { id: 'production', to: '/production', label: 'Production', icon: Factory },
  { id: 'quality', to: '/quality', label: 'Quality', icon: Target },
  { id: 'supply', to: '/supply-chain', label: 'Supply Chain', icon: Truck },
  { id: 'aftersales', to: '/after-sales', label: 'After Sales', icon: Wrench },
  { id: 'documents', to: '/documents', label: 'Documents', icon: FileText },
  { id: 'analytics', to: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export function visibleNavForRole(role) {
  if (role === 'Customer') return NAV.filter((n) => ['dashboard', 'projects', 'aftersales'].includes(n.id))
  if (role === 'Engineer') return NAV.filter((n) => n.id !== 'analytics')
  return NAV
}

/**
 * Fixed-height nav rail. Icon-only and narrow (64px) below the `lg`
 * breakpoint to maximize room for page content on phones/tablets; expands
 * to a labeled 220px column on desktop.
 */
export default function Sidebar({ role, onSignOut }) {
  const items = visibleNavForRole(role)

  return (
    <aside className="sticky top-0 flex h-screen w-16 lg:w-[220px] shrink-0 flex-col border-r border-line bg-surface transition-[width] duration-150">
      <div className="flex items-center gap-2.5 border-b border-line px-2.5 lg:px-5 py-4 lg:py-5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white text-sm font-black">
          F
        </span>
        <div className="hidden min-w-0 lg:block">
          <p className="truncate text-[15px] font-black tracking-tight text-ink-hi">FactoryIQ</p>
          <p className="text-[10px] tracking-wide text-ink-faint">MANUFACTURING PORTAL</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-1.5 lg:px-2.5 py-3 space-y-0.5">
        {items.map(({ id, to, label, icon: Icon, end }) => (
          <NavLink
            key={id}
            to={to}
            end={end}
            title={label}
            className={({ isActive }) =>
              `group flex items-center justify-center gap-2.5 rounded-lg px-0 lg:px-3 py-2.5 lg:py-2 text-[13px] font-semibold transition-colors lg:justify-start ${
                isActive
                  ? 'border border-brand/25 bg-brand/15 text-brand'
                  : 'border border-transparent text-ink-muted hover:bg-white/5 hover:text-ink-hi'
              }`
            }
          >
            <Icon size={17} strokeWidth={2} className="shrink-0" />
            <span className="hidden truncate lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line p-2 lg:p-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-card px-1.5 lg:px-2.5 py-2 justify-center lg:justify-start">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand text-[11px] font-extrabold text-white">
            {role[0]}
          </span>
          <div className="hidden min-w-0 lg:block flex-1">
            <p className="truncate text-xs font-bold text-ink-hi">{role}</p>
            <button onClick={onSignOut} className="text-[11px] text-ink-faint hover:text-ink-muted">
              Sign out
            </button>
          </div>
          <button onClick={onSignOut} title="Sign out" className="text-ink-faint hover:text-bad lg:hidden">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}
