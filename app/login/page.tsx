"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/`,
            },
        })

        if (error) {
            console.error("Error logging in:", error.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="bg-card w-full max-w-md p-8 rounded-3xl border border-border shadow-xl text-center">
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-muted-foreground mb-8">Sign in to access Retail Radar</p>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                            <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.411 8.411 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                        </svg>
                    )}
                    <span>{loading ? "Connecting..." : "Continue with Google"}</span>
                </button>
            </div>
        </div>
    )
}
