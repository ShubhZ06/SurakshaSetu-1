"use client";

import { motion } from "framer-motion";
import { Siren, Flame, Waves, HeartPulse } from "lucide-react";

export default function LabsPage() {
    const labs = [
        { title: "Virtual Evacuation", icon: <Siren className="w-8 h-8" />, status: "Active", color: "bg-emerald-100 text-emerald-600" },
        { title: "Hazard Spotting: Classroom", icon: <Flame className="w-8 h-8" />, status: "Locked", color: "bg-slate-100 text-slate-400" },
        { title: "Flood Response Sim", icon: <Waves className="w-8 h-8" />, status: "Locked", color: "bg-slate-100 text-slate-400" },
        { title: "CPR & First Aid", icon: <HeartPulse className="w-8 h-8" />, status: "Locked", color: "bg-slate-100 text-slate-400" },
    ];

    return (
        <div className="space-y-8 font-sans">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-500 rounded-2xl">
                    <Siren className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-800">Safety Labs</h1>
                    <p className="text-zinc-500 font-medium">Practice your emergency response skills.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {labs.map((lab, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-8 rounded-[2.5rem] border-2 flex items-center gap-6 transition-all ${lab.status === "Active"
                                ? "bg-white border-emerald-100 shadow-lg shadow-emerald-50"
                                : "bg-slate-50 border-transparent opacity-80"
                            }`}
                    >
                        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${lab.color}`}>
                            {lab.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-black mb-1 text-slate-800">{lab.title}</h3>
                            <p className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider">{lab.status === "Active" ? "Ready to start" : "Locked"}</p>
                            <button
                                disabled={lab.status !== "Active"}
                                className={`px-8 py-3 rounded-xl text-sm font-bold transition-transform active:scale-95 ${lab.status === "Active"
                                        ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-200"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    }`}
                            >
                                {lab.status === "Active" ? "Start Drill 🚨" : "Complete Previous"}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
