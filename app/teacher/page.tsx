"use client";

import { Users, Calendar, CheckSquare, BarChart, Bell } from "lucide-react";

export default function TeacherPage() {
    return (
        <div className="space-y-8 font-sans">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-800">Teacher Portal 🎓</h1>
                    <p className="text-zinc-500 font-medium mt-2">Manage classroom safety and drills.</p>
                </div>
                <button className="h-12 px-6 rounded-2xl bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-200">
                    Start Live Drill
                </button>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Stats Cards */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-6">
                    <div className="p-8 bg-emerald-50 rounded-[2.5rem] flex flex-col justify-between h-64">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-5xl font-black text-emerald-900 mb-2">24</h3>
                            <p className="text-emerald-700 font-bold">Students Present</p>
                        </div>
                    </div>
                    <div className="p-8 bg-blue-50 rounded-[2.5rem] flex flex-col justify-between h-64">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                            <CheckSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-5xl font-black text-blue-900 mb-2">100%</h3>
                            <p className="text-blue-700 font-bold">Drill Readiness</p>
                        </div>
                    </div>
                </div>

                {/* Schedule */}
                <div className="col-span-12 lg:col-span-4 row-span-2">
                    <div className="bg-orange-50 rounded-[2.5rem] p-8 h-full min-h-[400px]">
                        <h3 className="text-xl font-black text-orange-900 mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5" /> Safety Schedule
                        </h3>
                        <div className="space-y-4">
                            {[
                                { time: "09:00 AM", event: "Fire Drill Practice", class: "Class 5A" },
                                { time: "11:30 AM", event: "First Aid Workshop", class: "Class 6B" },
                                { time: "02:00 PM", event: "Emergency Exit Check", class: "Staff" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-4 rounded-2xl border-2 border-orange-100">
                                    <span className="text-xs font-bold text-orange-400 uppercase">{item.time}</span>
                                    <h4 className="font-bold text-zinc-800 text-lg">{item.event}</h4>
                                    <span className="text-sm font-bold text-zinc-400">{item.class}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Long Widget */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="bg-purple-50 rounded-[2.5rem] p-8 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-purple-900 mb-2">Safety Badge Progress</h3>
                            <p className="text-purple-600 font-medium">Class 5A has unlocked "Earthquake Master"!</p>
                        </div>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-purple-500 shadow-sm">
                            <BarChart className="w-8 h-8" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
