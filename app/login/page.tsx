"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HardHat, GraduationCap, Users, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState("student");
    const [isLoading, setIsLoading] = useState(false);

    const roles = [
        { id: "student", label: "Student", icon: <HardHat className="w-5 h-5" />, color: "bg-purple-100 text-purple-600 border-purple-200" },
        { id: "teacher", label: "Teacher", icon: <GraduationCap className="w-5 h-5" />, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
        { id: "parent", label: "Parent", icon: <Users className="w-5 h-5" />, color: "bg-pink-100 text-pink-600 border-pink-200" },
        { id: "admin", label: "Admin", icon: <ShieldCheck className="w-5 h-5" />, color: "bg-orange-100 text-orange-600 border-orange-200" },
    ];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            router.push(`/${selectedRole}`);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-8 relative z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-indigo-950 mb-2">Welcome Back! 👋</h1>
                    <p className="text-indigo-900/60 font-medium">Choose your role to login.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-2xl border-2 transition-all font-bold text-sm",
                                selectedRole === role.id
                                    ? cn(role.color, "ring-2 ring-offset-2 ring-indigo-100/50")
                                    : "bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200"
                            )}
                        >
                            {role.icon}
                            {role.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                defaultValue="demo_user"
                                className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-100 font-bold text-zinc-700 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                defaultValue="password123"
                                className="w-full p-4 rounded-2xl bg-zinc-50 border border-zinc-100 font-bold text-zinc-700 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                            <Lock className="absolute right-4 top-4 w-5 h-5 text-zinc-300" />
                        </div>
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-full py-4 rounded-2xl bg-indigo-900 text-white font-black text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Login
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center mt-8 text-sm font-bold text-zinc-400">
                    Don't have an account? <span className="text-indigo-500 cursor-pointer hover:underline">Sign up</span>
                </p>
            </motion.div>
        </div>
    );
}
