"use client"

import { X } from "lucide-react"
import { TribeData } from "./tribes-grid"

interface TribeDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    tribe: TribeData | null
    customers: any[]
}

export default function TribeDetailsModal({ isOpen, onClose, tribe, customers }: TribeDetailsModalProps) {
    if (!isOpen || !tribe) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-card w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">{tribe.title}</h2>
                        <p className="text-muted-foreground">{tribe.characteristic}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X size={24} className="text-muted-foreground" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-auto p-6">

                    {/* Stats Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {tribe.metrics.map((m, idx) => (
                            <div key={idx} className="bg-muted/50 p-4 rounded-xl border border-border">
                                <div className="text-2xl mb-2">{m.icon}</div>
                                <div className="text-sm text-muted-foreground">{m.label}</div>
                                <div className="font-semibold text-foreground">{m.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Real-time List */}
                    <h3 className="text-lg font-semibold text-foreground mb-4">Real-time Tribe Members</h3>
                    <div className="border border-border rounded-xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground">
                                <tr>
                                    <th className="p-3 font-medium">Age</th>
                                    <th className="p-3 font-medium">Gender</th>
                                    <th className="p-3 font-medium">Profession</th>
                                    <th className="p-3 font-medium">Spending</th>
                                    <th className="p-3 font-medium">Family Size</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {customers.slice(0, 50).map((c, idx) => (
                                    <tr key={idx} className="hover:bg-muted/50 transition-colors">
                                        <td className="p-3">{c.age}</td>
                                        <td className="p-3">{c.gender}</td>
                                        <td className="p-3">{c.profession}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                                        ${c.spending_score === 'High' ? 'bg-green-100 text-green-700' :
                                                    c.spending_score === 'Average' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}
                                    `}>
                                                {c.spending_score}
                                            </span>
                                        </td>
                                        <td className="p-3">{c.family_size}</td>
                                    </tr>
                                ))}
                                {customers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                            No members found currently.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {customers.length > 50 && (
                            <div className="p-2 text-center text-xs text-muted-foreground bg-muted/30">
                                Showing first 50 of {customers.length} members
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
