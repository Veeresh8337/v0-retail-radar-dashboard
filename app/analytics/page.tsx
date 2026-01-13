"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { supabase } from "@/lib/supabase"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AnalyticsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    // Chart Data States
    const [professionData, setProfessionData] = useState<any[]>([])
    const [spendingData, setSpendingData] = useState<any[]>([])
    const [ageDistribution, setAgeDistribution] = useState<any[]>([])

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        const { data, error } = await supabase.from('customers').select('*')
        if (data) {
            processAnalytics(data)
            setLoading(false)
        }
    }

    const processAnalytics = (data: any[]) => {
        // 1. Profession Count
        const profCounts: Record<string, number> = {}
        data.forEach(c => {
            const p = c.profession || "Unknown"
            profCounts[p] = (profCounts[p] || 0) + 1
        })
        setProfessionData(Object.keys(profCounts).map(k => ({ name: k, value: profCounts[k] })))

        // 2. Spending Score
        const spendCounts: Record<string, number> = {}
        data.forEach(c => {
            const s = c.spending_score || "Unknown"
            spendCounts[s] = (spendCounts[s] || 0) + 1
        })
        setSpendingData(Object.keys(spendCounts).map(k => ({ name: k, value: spendCounts[k] })))

        // 3. Age Groups
        const ageGroups = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 }
        data.forEach(c => {
            const age = c.age || 0
            if (age <= 25) ageGroups["18-25"]++
            else if (age <= 35) ageGroups["26-35"]++
            else if (age <= 50) ageGroups["36-50"]++
            else ageGroups["50+"]++
        })
        setAgeDistribution(Object.keys(ageGroups).map(k => ({ name: k, value: ageGroups[k as keyof typeof ageGroups] })))
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-background">
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg hover:bg-muted"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1 overflow-auto p-4 lg:p-8">
                    <h2 className="text-3xl font-bold mb-8">Analytics Dashboard</h2>

                    {loading ? (
                        <div>Loading analytics...</div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Profession Chart */}
                            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
                                <h3 className="text-xl font-semibold mb-4">Profession Distribution</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={professionData} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                            <XAxis type="number" />
                                            <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                            <Tooltip contentStyle={{ borderRadius: '8px' }} />
                                            <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Spending Score Pie */}
                            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
                                <h3 className="text-xl font-semibold mb-4">Spending Score</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={spendingData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {spendingData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: '8px' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-center gap-4 mt-4">
                                    {spendingData.map((entry, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                            <span className="text-sm text-muted-foreground">{entry.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Age Distribution */}
                            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm lg:col-span-2">
                                <h3 className="text-xl font-semibold mb-4">Age Demographics</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={ageDistribution}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip contentStyle={{ borderRadius: '8px' }} />
                                            <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
