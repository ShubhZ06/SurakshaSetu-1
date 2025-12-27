import { NextResponse } from 'next/server';
import { database } from '@/lib/database';

export async function GET() {
  try {
    // Test database connection by fetching courses
    const { data: courses, error: coursesError } = await database.courses.getAll();
    
    if (coursesError) {
      return NextResponse.json({ error: 'Database error', details: coursesError }, { status: 500 });
    }

    // Test user progress
    const { data: progress, error: progressError } = await database.progress.getByUser("94e89daa-938c-4eab-949d-5a45cd24d260");
    
    if (progressError) {
      return NextResponse.json({ error: 'Progress error', details: progressError }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: {
        courses: courses?.length || 0,
        progress: progress?.length || 0,
        sampleCourse: courses?.[0] || null,
        sampleProgress: progress?.[0] || null
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}