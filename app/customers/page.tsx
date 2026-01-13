"use client"

import { useState, useEffect } from "react"
import { Menu, X, Search } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { supabase } from "@/lib/supabase"

export default function CustomersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [customers, setCustomers] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = async () => {
        // Fetch latest 100 customers for performance
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .order('original_id', { ascending: true })
            .limit(100)

        if (data) {
            setCustomers(data)
            setLoading(false)
        }
    }

    const filteredCustomers = customers.filter(c =>
        c.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tribe_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.spending_score?.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h2 className="text-3xl font-bold">Customer Directory</h2>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                            <input
                                type="text"
                                placeholder="Search profession, tribe..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted text-muted-foreground uppercase text-xs">
                                    <tr>
                                        <th className="p-4">ID</th>
                                        <th className="p-4">Age</th>
                                        <th className="p-4">Gender</th>
                                        <th className="p-4">Profession</th>
                                        <th className="p-4">Spending Score</th>
                                        <th className="p-4">Tribe</th>
                                        <th className="p-4">Anomaly</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {loading ? (
                                        <tr><td colSpan={7} className="p-8 text-center">Loading...</td></tr>
                                    ) : filteredCustomers.length === 0 ? (
                                        <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No customers found.</td></tr>
                                    ) : (
                                        filteredCustomers.map((c) => (
                                            <tr key={c.original_id} className="hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium">{c.original_id}</td>
                                                <td className="p-4">{c.age}</td>
                                                <td className="p-4">{c.gender}</td>
                                                <td className="p-4">{c.profession}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                ${c.spending_score === 'High' ? 'bg-green-100 text-green-700' :
                                                            c.spending_score === 'Average' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}
                                            `}>
                                                        {c.spending_score}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                                        {c.tribe_name}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    {c.is_anomaly ? (
                                                        <span className="text-red-500 font-bold" title="Detected as Anomaly">⚠️ Yes</span>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {!loading && (
                            <div className="p-4 bg-muted/30 border-t border-border text-center text-xs text-muted-foreground">
                                Showing recent 100 customers
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
