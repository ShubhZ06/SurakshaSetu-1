"use client";

import { motion } from "framer-motion";
import { Gamepad2, Search, Zap, HelpCircle } from "lucide-react";

export default function FunZonePage() {
    const games = [
        { title: "Hazard Hunter", type: "Hidden Object", icon: <Search className="w-10 h-10" />, bg: "bg-purple-400", accent: "bg-purple-500" },
        { title: "Evacuation Dash", type: "Endless Runner", icon: <Zap className="w-10 h-10" />, bg: "bg-yellow-400", accent: "bg-yellow-500" },
        { title: "Safety Trivia", type: "Quiz", icon: <HelpCircle className="w-10 h-10" />, bg: "bg-pink-400", accent: "bg-pink-500" },
    ];

    return (
        <div className="space-y-8 font-sans">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 text-purple-500 rounded-2xl">
                    <Gamepad2 className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-800">Fun Zone</h1>
                    <p className="text-zinc-500 font-medium">Learn safety while playing!</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`group relative h-96 rounded-[3rem] overflow-hidden cursor-pointer ${game.bg} shadow-xl`}
                    >
                        {/* Background Decor */}
                        <div className={`absolute top-0 right-0 w-64 h-64 ${game.accent} rounded-full blur-3xl opacity-50 -mr-20 -mt-20`} />

                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 transition-transform duration-500 group-hover:-translate-y-4">
                            <div className="p-6 rounded-3xl bg-white/20 backdrop-blur-md shadow-inner text-white">
                                {game.icon}
                            </div>
                            <div className="text-center text-white">
                                <h3 className="text-3xl font-black mb-2">{game.title}</h3>
                                <span className="text-sm font-bold bg-white/20 px-4 py-1 rounded-full uppercase tracking-wider">{game.type}</span>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <button className="w-full py-4 rounded-2xl bg-white text-zinc-900 font-black hover:scale-[1.02] transition-transform shadow-lg">
                                Play Now
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
