import { LayoutGroup, motion } from 'framer-motion'

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  group = 'segment-pill',
}: {
  value: T
  onChange: (next: T) => void
  options: { id: T; label: string }[]
  group?: string
}) {
  return (
    <LayoutGroup id={group}>
      <div className="chip-scroll rounded-2xl border border-white/10 bg-white/5 p-1">
        {options.map((option) => {
          const active = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`relative shrink-0 rounded-full px-3 py-2 text-sm font-medium ${
                active ? 'text-night' : 'text-foam/80 hover:text-foam'
              }`}
            >
              {active ? (
                <motion.span
                  layoutId={`${group}-pill`}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan to-cyan-2"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              ) : null}
              <span className="relative z-10">{option.label}</span>
            </button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}
