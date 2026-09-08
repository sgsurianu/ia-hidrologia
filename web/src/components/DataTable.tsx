type Props = {
  headers: string[]
  rows: (string | number)[][]
}

export function DataTable({ headers, rows }: Props) {
  const wide = headers.length > 2
  return (
    <div className="min-w-0">
      {!wide ? (
        <dl className="space-y-2 md:hidden">
          {rows.map((row, i) => (
            <div key={i} className="min-w-0 rounded-xl border border-white/8 bg-black/20 px-3 py-2.5">
              <dt className="text-xs font-semibold text-cyan-2">{row[0]}</dt>
              <dd className="mt-1 max-w-full whitespace-normal break-words text-sm leading-relaxed text-foam">
                {row[1]}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mb-2 text-xs text-mist md:hidden">Desliza la tabla para ver todas las columnas.</p>
      )}
      <div className={`table-wrap ${wide ? '' : 'hidden md:block'}`}>
        <table className={`data ${wide ? 'data-wide' : 'data-fit'}`}>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
