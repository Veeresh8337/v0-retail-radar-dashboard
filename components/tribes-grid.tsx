import TribeCard from "./tribe-card"

const tribes = [
  {
    id: 1,
    name: "Tribe A",
    title: "The Ambitious Professionals",
    characteristic: "High Income, Young Urbanites",
    metrics: [
      { icon: "💰", label: "Spending", value: "High" },
      { icon: "👔", label: "Top Role", value: "Executive" },
      { icon: "👥", label: "Size", value: "24% of base" },
      { icon: "🎂", label: "Avg Age", value: "32" },
    ],
  },
  {
    id: 2,
    name: "Tribe B",
    title: "The Value Seekers",
    characteristic: "Budget-Conscious Families",
    metrics: [
      { icon: "💰", label: "Spending", value: "Medium" },
      { icon: "👔", label: "Top Role", value: "Manager" },
      { icon: "👥", label: "Size", value: "26% of base" },
      { icon: "🎂", label: "Avg Age", value: "41" },
    ],
  },
  {
    id: 3,
    name: "Tribe C",
    title: "The Tech Enthusiasts",
    characteristic: "Digital-First Millennials",
    metrics: [
      { icon: "💰", label: "Spending", value: "High" },
      { icon: "👔", label: "Top Role", value: "Specialist" },
      { icon: "👥", label: "Size", value: "26% of base" },
      { icon: "🎂", label: "Avg Age", value: "28" },
    ],
  },
  {
    id: 4,
    name: "Tribe D",
    title: "The Pragmatists",
    characteristic: "Established Professionals",
    metrics: [
      { icon: "💰", label: "Spending", value: "Medium" },
      { icon: "👔", label: "Top Role", value: "Director" },
      { icon: "👥", label: "Size", value: "24% of base" },
      { icon: "🎂", label: "Avg Age", value: "52" },
    ],
  },
]

export default function TribesGrid() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-foreground mb-6">Discovered Tribes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tribes.map((tribe) => (
          <TribeCard key={tribe.id} tribe={tribe} />
        ))}
      </div>
    </div>
  )
}
