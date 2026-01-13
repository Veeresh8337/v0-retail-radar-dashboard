"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface OverviewSectionProps {
  data: { name: string; value: number }[]
  totalTribes: number
}

export default function OverviewSection({ data, totalTribes }: OverviewSectionProps) {
  return (
    <div className="bg-card rounded-3xl border border-border shadow-sm p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Overview</h3>
          <p className="text-4xl font-bold text-foreground mb-4">{totalTribes} Unique Tribes</p>
          <p className="text-muted-foreground">Based on behavioral and demographic analysis of live customers.</p>
        </div>

        {/* Chart placeholder */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
