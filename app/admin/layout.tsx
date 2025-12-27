"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, LogOut, UserCircle, Shield, Users, Settings, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();
    const sidebarItems = [
        { title: "Overview", href: "/admin", icon: <Shield className="w-6 h-6" />, color: "text-amber-500", activeBg: "bg-amber-100", activeText: "text-amber-700" },
        { title: "Users", href: "/admin/users", icon: <Users className="w-6 h-6" />, color: "text-blue-500", activeBg: "bg-blue-100", activeText: "text-blue-700" },
        { title: "Security", href: "/admin/security", icon: <Lock className="w-6 h-6" />, color: "text-red-500", activeBg: "bg-red-100", activeText: "text-red-700" },
        { title: "Settings", href: "/admin/settings", icon: <Settings className="w-6 h-6" />, color: "text-slate-500", activeBg: "bg-slate-100", activeText: "text-slate-700" },
    ];

    return (
        <div className="flex min-h-screen bg-amber-50/50 font-sans">
            <motion.aside initial={false} animate={{ width: isSidebarOpen ? 280 : 100 }} className="fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-amber-50 shadow-sm">
                <div className="flex h-24 items-center justify-between px-6">
                    <Link href="/" className={cn("flex items-center gap-3 font-extrabold text-2xl text-amber-500", !isSidebarOpen && "justify-center")}>
                        {isSidebarOpen ? (
                            <>
                                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white">SS</div>
                                SurakshaSetu
                            </>
                        ) : "SS"}
                    </Link>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
                        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-4">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={cn("flex items-center gap-4 px-4 py-4 rounded-[1.5rem] transition-all font-bold text-lg", isActive ? cn(item.activeBg, item.activeText) : "text-slate-400 hover:text-slate-600 hover:bg-slate-50")}>
                                <div className={cn("relative z-10 transition-transform group-hover:scale-110", isActive ? item.activeText : item.color)}>{item.icon}</div>
                                {isSidebarOpen && <span>{item.title}</span>}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-6">
                    <Link href="/" className={cn("flex items-center gap-3 px-4 py-4 rounded-[1.5rem] text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors font-bold", !isSidebarOpen && "justify-center")}><LogOut className="w-6 h-6" /> {isSidebarOpen && <span>Sign Out</span>}</Link>
                </div>
            </motion.aside>
            <main className={cn("flex-1 transition-all duration-300 min-h-screen", isSidebarOpen ? "ml-[280px]" : "ml-[100px]")}>
                <header className="h-24 flex items-center justify-between px-8 bg-amber-50/50 sticky top-0 z-40">
                    <div />
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-amber-50"><div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center"><UserCircle className="w-5 h-5 text-amber-500" /></div> <span className="text-sm font-bold text-amber-900">Admin</span></div>
                </header>
                <div className="px-8 pb-8">{children}</div>
            </main>
        </div>
    );
}
