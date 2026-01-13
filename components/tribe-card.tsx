interface Metric {
  icon: string
  label: string
  value: string
}

interface Tribe {
  id: number
  name: string
  title: string
  characteristic: string
  metrics: Metric[]
}

interface TribeCardProps {
  tribe: Tribe
  onClick?: () => void
}

const badgeColors: Record<string, { bg: string; text: string }> = {
  "Mid-Career Grinders": { bg: "bg-blue-100", text: "text-blue-700" },
  "Young Families": { bg: "bg-purple-100", text: "text-purple-700" },
  "Solo Starters": { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Wealthy Seniors": { bg: "bg-amber-100", text: "text-amber-700" },
}

export default function TribeCard({ tribe, onClick }: TribeCardProps) {
  const colors = badgeColors[tribe.name] || { bg: "bg-gray-100", text: "text-gray-700" }

  return (
    <div className="bg-card rounded-3xl border border-border shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Badge */}
      <div className={`inline-block w-fit px-3 py-1 rounded-full ${colors.bg}`}>
        <span className={`text-sm font-semibold ${colors.text}`}>{tribe.name}</span>
      </div>

      {/* Title */}
      <div>
        <h4 className="text-lg font-semibold text-foreground">{tribe.title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{tribe.characteristic}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 my-2">
        {tribe.metrics.map((metric, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">{metric.label}</p>
            <p className="text-sm font-semibold text-foreground">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={onClick}
        className="mt-4 w-full bg-muted hover:bg-muted/80 text-foreground py-2 rounded-lg text-sm font-medium transition-colors"
      >
        View Persona Details
      </button>
    </div>
  )
}
