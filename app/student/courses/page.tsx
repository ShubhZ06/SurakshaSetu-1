"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Clock, Star, Trophy, BookOpen } from "lucide-react";
import { database } from "@/lib/database";
import type { Course, UserProgress } from "@/lib/types";

// Mock user data - replace with Auth0 integration later
const MOCK_USER = {
    id: "student-1",
    name: "Alex Kumar",
    grade_level: 7,
    class_section: "A"
};

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [progress, setProgress] = useState<UserProgress[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCourses() {
            try {
                // Load courses for student's grade level
                const { data: coursesData } = await database.courses.getByGradeLevel(MOCK_USER.grade_level);
                if (coursesData) setCourses(coursesData);

                // Load user progress
                const { data: progressData } = await database.progress.getByUser(MOCK_USER.id);
                if (progressData) setProgress(progressData);

            } catch (error) {
                console.error("Error loading courses:", error);
            } finally {
                setLoading(false);
            }
        }

        loadCourses();
    }, []);

    const getCourseProgress = (courseId: string) => {
        return progress.find(p => p.course_id === courseId);
    };

    const getCategoryColor = (category: string) => {
        const colors = {
            fire: { bg: "bg-orange-100", text: "text-orange-600", accent: "bg-orange-500" },
            earthquake: { bg: "bg-purple-100", text: "text-purple-600", accent: "bg-purple-500" },
            flood: { bg: "bg-blue-100", text: "text-blue-600", accent: "bg-blue-500" },
            general: { bg: "bg-green-100", text: "text-green-600", accent: "bg-green-500" }
        };
        return colors[category as keyof typeof colors] || colors.general;
    };

    const getCategoryEmoji = (category: string) => {
        const emojis = {
            fire: "🔥",
            earthquake: "🌍",
            flood: "🌊",
            general: "⛑️"
        };
        return emojis[category as keyof typeof emojis] || emojis.general;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-zinc-500 font-medium">Loading your courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 font-sans">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-500 rounded-2xl">
                    <Sparkles className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-800">Safety Courses</h1>
                    <p className="text-zinc-500 font-medium">Learn how to protect yourself and others.</p>
                </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white rounded-[2rem] p-6 border border-zinc-100">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-zinc-800 mb-1">Your Progress</h3>
                        <p className="text-zinc-500 text-sm">Keep learning to become a Safety Hero!</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-zinc-800">
                            {progress.filter(p => p.status === 'completed').length}/{courses.length}
                        </p>
                        <p className="text-sm text-zinc-500">Courses Completed</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, i) => {
                    const courseProgress = getCourseProgress(course.id);
                    const isCompleted = courseProgress?.status === 'completed';
                    const isInProgress = courseProgress?.status === 'in_progress';
                    const completionPercentage = courseProgress?.completion_percentage || 0;
                    const colors = getCategoryColor(course.category);

                    return (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`h-32 ${colors.bg} flex items-center justify-center relative overflow-hidden`}>
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,white_0%,transparent_50%)]" />
                                <span className="text-6xl">{getCategoryEmoji(course.category)}</span>
                                {isCompleted && (
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <Trophy className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-black mb-2 text-slate-800">{course.title}</h3>
                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${colors.bg} ${colors.text}`}>
                                            {course.category.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {course.duration_minutes} min
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3" />
                                            {course.points_reward} points
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="w-3 h-3" />
                                            {course.content_type}
                                        </div>
                                    </div>

                                    <p className="text-sm text-zinc-600 line-clamp-2">{course.description}</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between text-sm font-bold text-slate-400">
                                        <span>{course.content_type} Course</span>
                                        <span>{completionPercentage}% Complete</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${isCompleted ? 'bg-green-500' : colors.accent} rounded-full transition-all duration-500`}
                                            style={{ width: `${completionPercentage}%` }}
                                        />
                                    </div>

                                    <button className={`w-full py-4 rounded-2xl font-black hover:brightness-95 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95 duration-200 ${
                                        isCompleted 
                                            ? 'bg-green-100 text-green-700' 
                                            : `${colors.bg} ${colors.text}`
                                    }`}>
                                        {isCompleted ? (
                                            <>
                                                <Trophy className="w-5 h-5" />
                                                Review Course
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-5 h-5 fill-current" />
                                                {isInProgress ? "Continue" : "Start Course"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Empty State */}
            {courses.length === 0 && (
                <div className="text-center py-16">
                    <BookOpen className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-zinc-600 mb-2">No courses available</h3>
                    <p className="text-zinc-500">Check back later for new safety courses!</p>
                </div>
            )}
        </div>
    );
}