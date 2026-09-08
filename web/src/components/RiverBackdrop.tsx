export function RiverBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_-10%,rgba(62,224,200,0.18),transparent_55%),radial-gradient(900px_circle_at_90%_10%,rgba(244,193,110,0.08),transparent_45%),linear-gradient(180deg,#061018,#0b1d28_48%,#07141c)]" />
      <svg className="absolute bottom-0 left-0 h-[42vh] w-[200%] opacity-40 river-layer" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="none"
          stroke="#3ee0c8"
          strokeWidth="1.4"
          d="M0,192 C180,240 280,80 480,128 C680,176 760,288 960,240 C1160,192 1280,96 1440,144 L1440,320 L0,320 Z"
        />
        <path
          fill="rgba(62,224,200,0.08)"
          d="M0,224 C200,176 360,288 560,240 C760,192 900,96 1100,144 C1300,192 1380,240 1440,208 L1440,320 L0,320 Z"
        />
      </svg>
      <svg
        className="absolute bottom-[-8%] left-[-20%] h-[36vh] w-[200%] opacity-25 river-layer"
        style={{ animationDuration: '42s' }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(159,243,230,0.08)"
          d="M0,256 C240,208 320,128 560,176 C800,224 880,304 1120,256 C1280,224 1360,176 1440,192 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  )
}
