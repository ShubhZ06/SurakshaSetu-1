import { insforge } from './insforge';
import type { 
  School, 
  User, 
  Course, 
  UserProgress, 
  DrillLog, 
  Assignment, 
  EmergencyAlert 
} from './types';

// Database utility functions for SurakshaSetu platform

export const database = {
  // Schools
  schools: {
    async getAll() {
      return await insforge.database
        .from('schools')
        .select('*')
        .order('name');
    },

    async getById(id: string) {
      return await insforge.database
        .from('schools')
        .select('*')
        .eq('id', id)
        .single();
    },

    async create(school: Omit<School, 'id' | 'created_at' | 'updated_at'>) {
      return await insforge.database
        .from('schools')
        .insert([school])
        .select()
        .single();
    }
  },

  // Users
  users: {
    async getByRole(role: User['role'], schoolId?: string) {
      let query = insforge.database
        .from('users')
        .select('*')
        .eq('role', role)
        .eq('is_active', true);
      
      if (schoolId) {
        query = query.eq('school_id', schoolId);
      }
      
      return await query.order('name');
    },

    async getById(id: string) {
      return await insforge.database
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
    },

    async getByAuth0Id(auth0Id: string) {
      return await insforge.database
        .from('users')
        .select('*')
        .eq('auth0_id', auth0Id)
        .single();
    },

    async create(user: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
      return await insforge.database
        .from('users')
        .insert([user])
        .select()
        .single();
    },

    async updateProfile(id: string, updates: Partial<User>) {
      return await insforge.database
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    }
  },

  // Courses
  courses: {
    async getByGradeLevel(gradeLevel: number) {
      return await insforge.database
        .from('courses')
        .select('*')
        .lte('grade_level_min', gradeLevel)
        .gte('grade_level_max', gradeLevel)
        .eq('is_active', true)
        .order('category');
    },

    async getById(id: string) {
      return await insforge.database
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
    },

    async getAll() {
      return await insforge.database
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('grade_level_min', { ascending: true });
    }
  },

  // User Progress
  progress: {
    async getByUser(userId: string) {
      return await insforge.database
        .from('user_progress')
        .select(`
          *,
          courses (
            title,
            category,
            points_reward
          )
        `)
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });
    },

    async updateProgress(userId: string, courseId: string, updates: Partial<UserProgress>) {
      return await insforge.database
        .from('user_progress')
        .upsert([{
          user_id: userId,
          course_id: courseId,
          ...updates,
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
    },

    async getStats(userId: string) {
      const { data } = await insforge.database
        .from('user_progress')
        .select('status, total_points')
        .eq('user_id', userId);

      if (!data) return { totalPoints: 0, completedCourses: 0, inProgressCourses: 0 };

      return {
        totalPoints: data.reduce((sum, p) => sum + (p.total_points || 0), 0),
        completedCourses: data.filter(p => p.status === 'completed').length,
        inProgressCourses: data.filter(p => p.status === 'in_progress').length
      };
    }
  },

  // Drills
  drills: {
    async getBySchool(schoolId: string, limit = 10) {
      return await insforge.database
        .from('drill_logs')
        .select('*')
        .eq('school_id', schoolId)
        .order('scheduled_at', { ascending: false })
        .limit(limit);
    },

    async create(drill: Omit<DrillLog, 'id' | 'created_at' | 'updated_at'>) {
      return await insforge.database
        .from('drill_logs')
        .insert([drill])
        .select()
        .single();
    },

    async updateStatus(id: string, status: DrillLog['status'], updates?: Partial<DrillLog>) {
      return await insforge.database
        .from('drill_logs')
        .update({ status, ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
    }
  },

  // Assignments
  assignments: {
    async getByTeacher(teacherId: string) {
      return await insforge.database
        .from('assignments')
        .select('*')
        .eq('teacher_id', teacherId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
    },

    async getByStudent(studentId: string, gradeLevel: number, classSection?: string) {
      let query = insforge.database
        .from('assignments')
        .select('*')
        .eq('is_active', true)
        .eq('grade_level', gradeLevel);

      if (classSection) {
        query = query.eq('class_section', classSection);
      }

      return await query.order('due_date');
    },

    async create(assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>) {
      return await insforge.database
        .from('assignments')
        .insert([assignment])
        .select()
        .single();
    }
  },

  // Emergency Alerts
  alerts: {
    async getActive(schoolId: string) {
      return await insforge.database
        .from('emergency_alerts')
        .select('*')
        .eq('school_id', schoolId)
        .eq('is_active', true)
        .order('sent_at', { ascending: false });
    },

    async create(alert: Omit<EmergencyAlert, 'id' | 'created_at'>) {
      return await insforge.database
        .from('emergency_alerts')
        .insert([alert])
        .select()
        .single();
    },

    async deactivate(id: string) {
      return await insforge.database
        .from('emergency_alerts')
        .update({ is_active: false })
        .eq('id', id);
    }
  }
};

export default database;