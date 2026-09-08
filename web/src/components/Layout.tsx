import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { SearchPalette } from './SearchPalette'
import { RiverBackdrop } from './RiverBackdrop'
import { meta } from '../content/meta'

const links = [
  { to: '/', label: 'Resultados' },
  { to: '/experimento', label: 'Experimento' },
  { to: '/datos', label: 'Datos' },
  { to: '/modelos', label: 'Modelos' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/conclusiones', label: 'Conclusiones' },
  { to: '/reproducibilidad', label: 'Repro' },
]

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const sync = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    }
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen">
      <RiverBackdrop />

      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-white/8 bg-night/70 pt-[env(safe-area-inset-top)] backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 md:px-6 md:py-3">
          <div className="min-w-0">
            <p className="font-display text-base tracking-tight text-foam md:text-lg">La Oca</p>
            <p className="hidden truncate text-[11px] uppercase tracking-[0.18em] text-mist sm:block">
              Visor TFE · SAMA · UNIR
            </p>
          </div>
          <nav className="hidden items-center gap-1 xl:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm transition ${
                    isActive ? 'bg-cyan text-night' : 'text-mist hover:bg-white/5 hover:text-foam'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <button type="button" className="btn shrink-0 px-3" onClick={() => setSearchOpen(true)}>
            Buscar
            <kbd className="ml-2 hidden rounded-md bg-black/30 px-1.5 py-0.5 text-[10px] text-mist md:inline">
              ⌘K
            </kbd>
          </button>
        </div>
        <nav className="chip-scroll px-4 pb-2 xl:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `inline-flex min-h-10 shrink-0 items-center rounded-full px-3 text-sm ${
                  isActive ? 'bg-cyan text-night' : 'bg-white/5 text-mist'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 py-6 md:px-6 md:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-white/8 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-7xl px-4 py-5 text-[11px] leading-relaxed text-mist/70 md:px-6">
          {meta.disclaimer}
        </div>
      </footer>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
