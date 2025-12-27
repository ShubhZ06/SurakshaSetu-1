"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    BookOpen,
    FlaskConical,
    Gamepad2,
    Menu,
    X,
    LogOut,
    UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const sidebarItems = [
        {
            title: "Dashboard",
            href: "/student",
            icon: <LayoutDashboard className="w-6 h-6" />,
            color: "text-purple-500",
            activeBg: "bg-purple-100",
            activeText: "text-purple-700"
        },
        {
            title: "Courses",
            href: "/student/courses",
            icon: <BookOpen className="w-6 h-6" />,
            color: "text-orange-500",
            activeBg: "bg-orange-100",
            activeText: "text-orange-700"
        },
        {
            title: "Labs",
            href: "/student/labs",
            icon: <FlaskConical className="w-6 h-6" />,
            color: "text-emerald-500",
            activeBg: "bg-emerald-100",
            activeText: "text-emerald-700"
        },
        {
            title: "Fun Zone",
            href: "/student/fun-zone",
            icon: <Gamepad2 className="w-6 h-6" />,
            color: "text-pink-500",
            activeBg: "bg-pink-100",
            activeText: "text-pink-700"
        },
    ];

    return (
        <div className="flex min-h-screen bg-sky-50 font-sans">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 100 }}
                className="fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-indigo-50 shadow-sm"
            >
                <div className="flex h-24 items-center justify-between px-6">
                    <Link href="/" className={cn("flex items-center gap-3 font-extrabold text-2xl text-indigo-500", !isSidebarOpen && "justify-center")}>
                        {isSidebarOpen ? (
                            <>
                                <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white">SS</div>
                                SurakshaSetu
                            </>
                        ) : "SS"}
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-4">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-4 rounded-[1.5rem] transition-all duration-200 group relative overflow-hidden font-bold text-lg",
                                    isActive
                                        ? cn(item.activeBg, item.activeText)
                                        : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <div className={cn("relative z-10 transition-transform group-hover:scale-110", isActive ? item.activeText : item.color)}>
                                    {item.icon}
                                </div>
                                {isSidebarOpen && (
                                    <span className="relative z-10">{item.title}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6">
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-3 px-4 py-4 rounded-[1.5rem] text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors font-bold",
                            !isSidebarOpen && "justify-center"
                        )}
                    >
                        <LogOut className="w-6 h-6" />
                        {isSidebarOpen && <span>Sign Out</span>}
                    </Link>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main
                className={cn(
                    "flex-1 transition-all duration-300 min-h-screen",
                    isSidebarOpen ? "ml-[280px]" : "ml-[100px]"
                )}
            >
                <header className="h-24 flex items-center justify-between px-8 bg-sky-50 sticky top-0 z-40">
                    {/* spacer to push content down if needed or just breadcrumbs */}
                    <div />
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-indigo-50">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                <UserCircle className="w-5 h-5 text-indigo-500" />
                            </div>
                            <span className="text-sm font-bold text-indigo-900">Student</span>
                        </div>
                    </div>
                </header>

                <div className="px-8 pb-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
