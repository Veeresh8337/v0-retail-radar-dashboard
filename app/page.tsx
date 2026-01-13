"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import OverviewSection from "@/components/overview-section"
import TribesGrid from "@/components/tribes-grid"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-muted"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8 space-y-8">
            <OverviewSection />
            <TribesGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
