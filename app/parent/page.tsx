"use client";

import { Heart, ShieldAlert, Clock, Activity } from "lucide-react";

export default function ParentPage() {
    return (
        <div className="space-y-8 font-sans">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-800">Parent Portal 👨‍👩‍👧‍👦</h1>
                    <p className="text-zinc-500 font-medium mt-2">Safety updates and innovative drills.</p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Child Profile Card */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="bg-pink-400 rounded-[2.5rem] p-8 text-white h-full relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/50 mb-6 flex items-center justify-center text-4xl">
                                👶
                            </div>
                            <h2 className="text-3xl font-black mb-1">Leo's Status</h2>
                            <p className="text-pink-100 font-bold mb-6">Marked Safe at School</p>

                            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                                <div className="flex justify-between mb-2 font-bold text-sm">
                                    <span>Preparedness Level</span>
                                    <span>90%</span>
                                </div>
                                <div className="w-full bg-black/20 rounded-full h-2">
                                    <div className="bg-white h-2 rounded-full w-[90%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-6">
                    <div className="bg-yellow-50 rounded-[2.5rem] p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white rounded-xl text-yellow-500 shadow-sm"><Activity className="w-6 h-6" /></div>
                            <h3 className="font-bold text-yellow-900 text-lg">Drills Completed</h3>
                        </div>
                        <p className="text-4xl font-black text-yellow-900">12 <span className="text-lg font-bold text-yellow-600">Total</span></p>
                    </div>
                    <div className="bg-red-50 rounded-[2.5rem] p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white rounded-xl text-red-500 shadow-sm"><ShieldAlert className="w-6 h-6" /></div>
                            <h3 className="font-bold text-red-900 text-lg">Alerts</h3>
                        </div>
                        <p className="text-4xl font-black text-red-900">0 <span className="text-lg font-bold text-red-600">Active</span></p>
                        <p className="text-sm font-bold text-red-400 mt-2">Campus is safe.</p>
                    </div>
                    <div className="col-span-2 bg-indigo-50 rounded-[2.5rem] p-8 flex items-center gap-6">
                        <div className="p-4 bg-white rounded-full text-indigo-500 shadow-sm"><Clock className="w-8 h-8" /></div>
                        <div>
                            <h3 className="font-black text-xl text-indigo-900">Last Drill</h3>
                            <p className="text-indigo-600 font-bold">Fire Evacuation - Yesterday at 10:00 AM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
