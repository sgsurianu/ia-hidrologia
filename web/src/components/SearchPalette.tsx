import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { searchItems } from '../content/searchIndex'

export function SearchPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return searchItems.slice(0, 8)
    return searchItems.filter(
      (item) =>
        item.label.toLowerCase().includes(term) ||
        item.keywords.some((k) => k.toLowerCase().includes(term)),
    )
  }, [q])

  useEffect(() => {
    if (!open) setQ('')
  }, [open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-night/70 p-3 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-sm sm:p-4 sm:pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Cerrar" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/12 bg-[#0d222c] shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
          >
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar horizonte, modelo, métrica…"
              className="w-full border-b border-white/10 bg-transparent px-5 py-4 text-base text-foam outline-none placeholder:text-mist"
            />
            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-4 text-sm text-mist">Sin resultados en el índice documentado.</li>
              ) : (
                results.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="flex w-full flex-col rounded-2xl px-4 py-3 text-left hover:bg-cyan/10"
                      onClick={() => {
                        navigate(item.to)
                        onClose()
                      }}
                    >
                      <span className="text-sm font-medium text-foam">{item.label}</span>
                      <span className="text-xs text-mist">{item.hint}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
