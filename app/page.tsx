"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import OverviewSection from "@/components/overview-section"
import TribesGrid, { TribeData } from "@/components/tribes-grid"
import { supabase } from "@/lib/supabase"

// Static definition of Tribes to map IDs to Titles/Characteristics (since these are conceptual)
const TRIBE_DEFINITIONS: Record<string, { title: string; characteristic: string }> = {
  "Mid-Career Grinders": {
    title: "Mid-Career Grinders",
    characteristic: "High Income, Busy Professionals"
  },
  "Young Families": {
    title: "Young Families",
    characteristic: "Budget-Conscious, Growing"
  },
  "Solo Starters": {
    title: "Solo Starters",
    characteristic: "Young, Aspiring, Singles"
  },
  "Wealthy Seniors": {
    title: "Wealthy Seniors",
    characteristic: "Established, High Spenders"
  }
}

import TribeDetailsModal from "@/components/tribe-details-modal"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [customers, setCustomers] = useState<any[]>([])
  const [tribeStats, setTribeStats] = useState<TribeData[]>([])
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([])

  // Modal State
  const [selectedTribe, setSelectedTribe] = useState<TribeData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('customers').select('*')
      if (error) {
        console.error("Error fetching customers:", error)
      } else if (data) {
        processCustomerData(data)
      }
    }

    fetchData()

    // Real-time subscription
    const channel = supabase
      .channel('customers-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'customers' }, (payload) => {
        console.log('Real-time update:', payload)
        fetchData() // Re-fetch on any change (simple approach)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const processCustomerData = (data: any[]) => {
    setCustomers(data)
    const totalCustomers = data.length

    // Group by Tribe Name
    const groups: Record<string, any[]> = {}
    data.forEach(c => {
      const name = c.tribe_name || "Unknown"
      if (!groups[name]) groups[name] = []
      groups[name].push(c)
    })

    // Calculate Stats for TribesGrid
    const stats: TribeData[] = Object.keys(groups).map((name, index) => {
      const group = groups[name]
      const count = group.length
      const percentage = ((count / totalCustomers) * 100).toFixed(0) + "%"

      // Avg Age
      const avgAge = (group.reduce((sum, c) => sum + (c.age || 0), 0) / count).toFixed(0)

      // Most common Spending Score (Mode)
      const spendingCounts: Record<string, number> = {}
      group.forEach(c => {
        const s = c.spending_score
        spendingCounts[s] = (spendingCounts[s] || 0) + 1
      })
      const topSpending = Object.keys(spendingCounts).reduce((a, b) => spendingCounts[a] > spendingCounts[b] ? a : b)

      // Most common Profession (Mode) - mapped to "Top Role"
      const roleCounts: Record<string, number> = {}
      group.forEach(c => {
        const r = c.profession
        roleCounts[r] = (roleCounts[r] || 0) + 1
      })
      const topRole = Object.keys(roleCounts).reduce((a, b) => roleCounts[a] > roleCounts[b] ? a : b)

      const def = TRIBE_DEFINITIONS[name] || { title: name, characteristic: "Discovered Segment" }

      return {
        id: index + 1,
        name: name,
        title: def.title,
        characteristic: def.characteristic,
        metrics: [
          { icon: "💰", label: "Spending", value: topSpending },
          { icon: "👔", label: "Top Role", value: topRole },
          { icon: "👥", label: "Size", value: percentage },
          { icon: "🎂", label: "Avg Age", value: avgAge },
        ]
      }
    })

    setTribeStats(stats)

    // Calculate Chart Data for OverviewSection
    const chart = Object.keys(groups).map(name => ({
      name: name,
      value: groups[name].length
    }))
    setChartData(chart)
  }

  const handleTribeClick = (tribe: TribeData) => {
    setSelectedTribe(tribe)
    setIsModalOpen(true)
  }

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
            <OverviewSection data={chartData} totalTribes={tribeStats.length} />
            <TribesGrid
              tribes={tribeStats}
              onTribeClick={handleTribeClick}
            />
          </div>
        </div>
      </main>

      {/* Modal */}
      <TribeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tribe={selectedTribe}
        customers={selectedTribe ? customers.filter(c => c.tribe_name === selectedTribe.name) : []}
      />
    </div>
  )
}
