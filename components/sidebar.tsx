"use client"

import { Home, BarChart3, Users, Settings } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Overview", href: "#" },
    { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Users, label: "Customers", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-40 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">Retail Radar</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-semibold text-primary-foreground">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
