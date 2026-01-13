import { Bell } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-30">
      <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="hidden lg:block">
          <h2 className="text-2xl font-semibold text-foreground">Retail Radar: Tribe Discovery</h2>
        </div>

        {/* Mobile title */}
        <div className="lg:hidden ml-12">
          <h2 className="text-lg font-semibold text-foreground">Tribe Discovery</h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>

          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hidden sm:flex">
            <span className="text-sm font-semibold text-primary-foreground">JD</span>
          </div>
        </div>
      </div>
    </header>
  )
}
