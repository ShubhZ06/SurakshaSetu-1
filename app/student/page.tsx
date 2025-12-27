"use client";

import { useEffect, useState } from "react";
import {
    Trophy, Clock, Star,
    BookOpen, Calendar, ArrowRight,
    MoreHorizontal, Flame, Droplets, Activity
} from "lucide-react";
import { database } from "@/lib/database";
import type { Course, UserProgress, DrillLog } from "@/lib/types";

// Mock user data - replace with Auth0 integration later
const MOCK_USER = {
    id: "student-1",
    name: "Alex Kumar",
    grade_level: 7,
    class_section: "A"
};

export default function StudentDashboard() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [progress, setProgress] = useState<UserProgress[]>([]);
    const [stats, setStats] = useState({ totalPoints: 0, completedCourses: 0, inProgressCourses: 0 });
    const [upcomingDrills, setUpcomingDrills] = useState<DrillLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                // Load courses for student's grade level
                const { data: coursesData } = await database.courses.getByGradeLevel(MOCK_USER.grade_level);
                if (coursesData) setCourses(coursesData);

                // Load user progress
                const { data: progressData } = await database.progress.getByUser(MOCK_USER.id);
                if (progressData) setProgress(progressData);

                // Load progress stats
                const statsData = await database.progress.getStats(MOCK_USER.id);
                setStats(statsData);

                // Load upcoming drills (mock school ID)
                const { data: drillsData } = await database.drills.getBySchool("school-1", 3);
                if (drillsData) setUpcomingDrills(drillsData);

            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboardData();
    }, []);
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-zinc-500 font-medium">Loading your safety dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 font-sans">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-800 tracking-tight">Safety Dashboard</h1>
                    <p className="text-zinc-500 font-medium mt-1">Welcome back, {MOCK_USER.name}! Ready to become a Safety Hero?</p>
                </div>

                {/* Mock Search/Actions */}
                <div className="flex gap-3">
                    <div className="h-12 px-6 rounded-full bg-white border border-zinc-100 flex items-center text-zinc-400 min-w-[300px] shadow-sm">
                        Search safety tips...
                    </div>
                    <button className="h-12 px-6 rounded-full bg-red-500 text-white font-bold shadow-lg shadow-red-200/50">SOS Drill</button>
                </div>
            </div>

            {/* Main Bento Grid */}
            <div className="grid grid-cols-12 gap-6">

                {/* LEFT COLUMN (Stats) - Span 3 */}
                <div className="col-span-12 lg:col-span-3 space-y-6">

                    {/* Stats Row 1 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-emerald-50 rounded-[2rem] flex flex-col items-center justify-center text-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-white text-emerald-500 flex items-center justify-center shadow-sm">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <h3 className="text-3xl font-black text-emerald-900">{stats.completedCourses}</h3>
                            <span className="text-sm font-bold text-emerald-600/70">Completed</span>
                        </div>
                        <div className="p-6 bg-orange-50 rounded-[2rem] flex flex-col items-center justify-center text-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-white text-orange-400 flex items-center justify-center shadow-sm">
                                <Flame className="w-5 h-5" />
                            </div>
                            <h3 className="text-3xl font-black text-orange-900">{upcomingDrills.length}</h3>
                            <span className="text-sm font-bold text-orange-600/70">Drills</span>
                        </div>
                    </div>

                    {/* Stats Row 2 (Full Width Card) */}
                    <div className="p-6 bg-purple-50 rounded-[2rem] flex flex-col items-center justify-center text-center gap-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Star className="w-24 h-24 text-purple-500 rotate-12" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white text-purple-400 flex items-center justify-center shadow-sm relative z-10">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-4xl font-black text-purple-900 relative z-10">{stats.totalPoints}</h3>
                        <span className="text-sm font-bold text-purple-600/70 relative z-10">Safety Points</span>
                    </div>

                    {/* Current Course Progress Widget */}
                    <div className="p-6 bg-indigo-50 rounded-[2rem] relative">
                        <div className="flex items-center gap-3 mb-4">
                            <BookOpen className="w-5 h-5 text-indigo-500" />
                            <span className="font-bold text-indigo-900">Current Course</span>
                        </div>

                        {stats.inProgressCourses > 0 ? (
                            <>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-3xl font-black text-indigo-950">
                                        {progress.find(p => p.status === 'in_progress')?.completion_percentage || 0}%
                                    </span>
                                    <span className="text-lg font-medium text-indigo-400">In Progress</span>
                                </div>

                                <div className="w-full bg-white rounded-full h-2 mb-2">
                                    <div 
                                        className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                                        style={{ width: `${progress.find(p => p.status === 'in_progress')?.completion_percentage || 0}%` }}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-2xl font-black text-indigo-950">Ready</span>
                                    <span className="text-lg font-medium text-indigo-400">Start Learning</span>
                                </div>
                                <div className="w-full bg-white rounded-full h-2 mb-2">
                                    <div className="bg-indigo-200 h-2 rounded-full w-full" />
                                </div>
                            </>
                        )}

                        <button className="absolute bottom-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-500 hover:scale-105 transition-transform">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* CENTER COLUMN (Character Progress) - Span 5 */}
                <div className="col-span-12 lg:col-span-5">
                    <div className="h-full bg-pink-100 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <span className="font-bold text-pink-900 text-lg">Readiness Level</span>
                            <span className="font-black text-pink-500 text-2xl">Lv. 4</span>
                        </div>
                        <div className="w-full bg-pink-200/50 rounded-full h-3 mb-8 relative z-10">
                            <div className="bg-pink-500 h-3 rounded-full w-[80%]" />
                        </div>

                        {/* Character Area */}
                        <div className="flex-1 flex items-center justify-center relative z-10">
                            <div className="relative">
                                {/* Circle Background */}
                                <div className="absolute inset-0 bg-white/40 blur-3xl rounded-full scale-150" />

                                {/* Placeholder for Character Image */}
                                <div className="w-64 h-64 relative bg-pink-200/50 rounded-full flex items-center justify-center border-4 border-white/50 text-6xl">
                                    ⛑️
                                </div>

                                {/* Floating Buttons */}
                                <div className="flex justify-center gap-4 mt-8">
                                    {[1, 2, 3].map((_, i) => (
                                        <button key={i} className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-pink-100 flex items-center justify-center text-xl hover:-translate-y-1 transition-transform">
                                            {["🔦", "🎒", "🗺️"][i]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN (Schedule) - Span 4 */}
                <div className="col-span-12 lg:col-span-4 space-y-6">

                    {/* Calendar Strip */}
                    <div className="flex justify-between items-center text-center bg-zinc-900 text-white p-4 rounded-full">
                        {["M", "T", "W", "T", "F"].map((day, i) => (
                            <div key={i} className={`flex flex-col items-center justify-center w-10 h-10 rounded-full ${i === 2 ? "bg-red-500" : ""}`}>
                                <span className="text-xs font-medium opacity-70">{day}</span>
                                <span className="text-sm font-bold">{14 + i}</span>
                            </div>
                        ))}
                    </div>

                    {/* Schedule List */}
                    <div className="bg-white rounded-[2.5rem] p-6 min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl text-zinc-900">Drill Schedule</h3>
                            <button className="p-2 text-zinc-400 hover:text-zinc-600"><MoreHorizontal /></button>
                        </div>

                        <div className="space-y-4">
                            {upcomingDrills.length > 0 ? upcomingDrills.map((drill, i) => {
                                const drillColors = {
                                    fire: "bg-orange-100 text-orange-700",
                                    earthquake: "bg-purple-100 text-purple-700",
                                    lockdown: "bg-red-100 text-red-700",
                                    evacuation: "bg-blue-100 text-blue-700"
                                };
                                
                                const drillEmojis = {
                                    fire: "🔥",
                                    earthquake: "🌍",
                                    lockdown: "🔒",
                                    evacuation: "🚪"
                                };

                                return (
                                    <div key={drill.id} className="flex gap-4">
                                        <span className="text-sm font-bold text-zinc-400 w-12 pt-3">
                                            {new Date(drill.scheduled_at).toLocaleDateString('en-US', { weekday: 'short' })}
                                        </span>
                                        <div className={`flex-1 p-4 rounded-2xl ${drillColors[drill.drill_type]} flex justify-between items-center`}>
                                            <div>
                                                <h4 className="font-bold capitalize">{drill.drill_type} Drill</h4>
                                                <span className="text-xs opacity-70 font-medium">
                                                    {new Date(drill.scheduled_at).toLocaleTimeString('en-US', { 
                                                        hour: 'numeric', 
                                                        minute: '2-digit',
                                                        hour12: true 
                                                    })}
                                                </span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-sm">
                                                {drillEmojis[drill.drill_type]}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="text-center py-8 text-zinc-400">
                                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                    <p className="font-medium">No upcoming drills</p>
                                    <p className="text-sm">Check back later!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Section - Fun/Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-pink-50 rounded-[2.5rem] p-8 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-xl text-pink-900 mb-1">Emergency Kit Check</h3>
                        <p className="text-sm text-pink-600 font-medium mb-4">Complete your backpack!</p>
                        <div className="flex -space-x-2">
                            {["🔦", "💊", "💧"].map((emoji, i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-pink-200 border-2 border-white flex items-center justify-center text-lg shadow-sm">
                                    {emoji}
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold border-2 border-white">+2</div>
                        </div>
                    </div>
                    <div className="w-20 h-20 rounded-full border-8 border-pink-200 flex items-center justify-center text-xl font-black text-pink-900">
                        3/5
                    </div>
                </div>

                <div className="bg-blue-50 rounded-[2.5rem] p-8 space-y-4">
                    <h3 className="font-bold text-xl text-blue-900">Safety Quiz</h3>
                    <p className="text-lg font-medium text-blue-800">
                        What should you do during an earthquake?
                    </p>
                    <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-white rounded-xl text-blue-600 font-bold hover:bg-blue-200 transition">Run Outside</button>
                        <button className="flex-1 py-2 bg-white rounded-xl text-blue-600 font-bold hover:bg-blue-200 transition">Drop, Cover, Hold</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
