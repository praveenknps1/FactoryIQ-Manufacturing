import { useState } from 'react'
import { ROLES } from '../data/mockData.js'

export default function Login({ onLogin }) {
  const [loginRole, setLoginRole] = useState('Manager')

  return (
    <div className="flex min-h-screen items-center justify-center bg-base px-4">
      <div className="w-full max-w-[380px] rounded-[20px] border border-line bg-card p-8 sm:p-10 shadow-pop">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-xl font-black text-white">
            F
          </div>
          <p className="text-2xl sm:text-[26px] font-black tracking-tight text-ink-hi">FactoryIQ</p>
          <p className="mt-1 text-xs sm:text-sm text-ink-muted">Manufacturing Excellence Portal</p>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-ink-muted">Email</label>
          <div className="rounded-lg border border-line bg-field px-3.5 py-2.5 text-[13px] text-ink-mid">
            admin@factoryiq.com
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-ink-muted">Role</label>
          <select
            value={loginRole}
            onChange={(e) => setLoginRole(e.target.value)}
            className="w-full rounded-lg border border-line bg-field px-3.5 py-2.5 text-[13px] font-medium text-ink-hi outline-none cursor-pointer"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onLogin(loginRole)}
          className="w-full rounded-[10px] bg-brand py-3 text-[15px] font-bold tracking-wide text-white hover:bg-blue-600 transition-colors"
        >
          Sign In →
        </button>
        <p className="mt-4 text-center text-[11px] text-ink-faint">Demo — select any role to explore</p>
      </div>
    </div>
  )
}
