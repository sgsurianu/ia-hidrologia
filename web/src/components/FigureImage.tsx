export function FigureImage({
  src,
  caption,
}: {
  src: string
  caption: string
}) {
  return (
    <figure className="max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white">
      <img src={src} alt={caption} className="h-auto w-full object-contain" loading="lazy" />
      <figcaption className="border-t border-white/10 bg-[#0d222c] px-3 py-2 text-xs text-mist">
        {caption}
      </figcaption>
    </figure>
  )
}
