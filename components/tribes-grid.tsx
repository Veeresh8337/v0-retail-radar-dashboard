import TribeCard from "./tribe-card"

export interface TribeData {
  id: number
  name: string
  title: string
  characteristic: string
  metrics: { icon: string; label: string; value: string }[]
}

export default function TribesGrid({ tribes, onTribeClick }: { tribes: TribeData[], onTribeClick?: (tribe: TribeData) => void }) {
  if (!tribes || tribes.length === 0) {
    return <div className="text-center p-8 text-muted-foreground">Loading tribes...</div>
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-foreground mb-6">Discovered Tribes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tribes.map((tribe) => (
          <TribeCard
            key={tribe.id}
            tribe={tribe}
            onClick={() => onTribeClick?.(tribe)}
          />
        ))}
      </div>
    </div>
  )
}
