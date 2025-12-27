"use client";

import { motion } from "framer-motion";
import { Siren, ArrowRight, Shield, Heart, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-sky-50 font-sans selection:bg-pink-200 overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white border border-red-100 shadow-sm text-red-500 font-bold text-sm">
            <Siren className="w-4 h-4" /> SurakshaSetu
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 text-indigo-950 leading-tight">
            Be Prepared. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Stay Safe.</span>
          </h1>

          <p className="text-2xl text-indigo-900/60 max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
            Empowering schools with interactive drills, safety training, and real-time emergency preparedness.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-indigo-900 text-white font-black text-xl shadow-xl shadow-indigo-200 hover:bg-indigo-800 transition-all"
            >
              Get Started
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Highlights (Subtle) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full"
        >
          {[
            { icon: <Shield className="w-6 h-6 text-purple-500" />, title: "Safety First", text: "Comprehensive drill tracking." },
            { icon: <Activity className="w-6 h-6 text-emerald-500" />, title: "Real-time Action", text: "Instant emergency alerts." },
            { icon: <Heart className="w-6 h-6 text-pink-500" />, title: "Kids Friendly", text: "Gamified learning modules." },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-white/40 rounded-3xl backdrop-blur-sm border border-white/50">
              <div className="p-3 bg-white rounded-2xl shadow-sm mb-4">{feature.icon}</div>
              <h3 className="font-bold text-indigo-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-indigo-900/60 font-medium">{feature.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 text-indigo-300 font-bold text-sm"
        >
          © 2025 SurakshaSetu Initiative
        </motion.div>
      </div>
    </div>
  );
}
