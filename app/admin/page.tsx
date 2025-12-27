"use client";

import { Shield, Server, Users } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="space-y-8 font-sans">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-800">Admin Portal 🛡️</h1>
                    <p className="text-zinc-500 font-medium mt-2">Campus safety and emergency readiness.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 rounded-full bg-red-500 text-white font-bold shadow-lg shadow-red-200">
                        Trigger Alarm
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* System Health */}
                <div className="col-span-12 lg:col-span-6 bg-zinc-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <div className="relative z-10 font-mono">
                        <h3 className="text-zinc-400 font-bold mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Campus Safety Index
                        </h3>
                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-5xl font-black text-emerald-400">98%</span>
                            <span className="font-bold text-zinc-400">Ready</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-bold text-zinc-500">
                                <span>Equipment Check</span>
                                <span>OK</span>
                            </div>
                            <div className="w-full bg-zinc-800 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full w-[100%]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Stats */}
                <div className="col-span-12 lg:col-span-3 bg-orange-50 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white text-orange-500 flex items-center justify-center shadow-sm mb-4">
                        <Users className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl font-black text-orange-900 mb-1">1,240</h3>
                    <p className="text-orange-600 font-bold">Safe Zones</p>
                </div>

                <div className="col-span-12 lg:col-span-3 bg-purple-50 rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white text-purple-500 flex items-center justify-center shadow-sm mb-4">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="text-4xl font-black text-purple-900 mb-1">0</h3>
                    <p className="text-purple-600 font-bold">Incidents</p>
                </div>
            </div>
        </div>
    );
}
