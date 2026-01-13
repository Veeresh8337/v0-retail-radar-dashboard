"use client"

import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Home, BarChart3, Users, Settings, LogOut } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { icon: Home, label: "Overview", href: "/" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Users, label: "Customers", href: "/customers" },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-40 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-primary">Retail Radar</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          {/* Settings (Placeholder) */}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings size={20} />
            <span>Settings</span>
          </button>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
