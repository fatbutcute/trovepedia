const STATS = [
  { value: '20+', label: 'Osztály' },
  { value: '15+', label: 'Útmutató' },
  { value: 'D25', label: 'Delve mélység' },
  { value: '∞',   label: 'Kaland' },
]

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="stats-inner">
        {STATS.map(({ value, label }) => (
          <div key={label} className="reveal">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
