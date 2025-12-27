// Database types for SurakshaSetu platform

export interface School {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
  email?: string;
  principal_name?: string;
  total_students?: number;
  total_teachers?: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  auth0_id?: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  school_id?: string;
  grade_level?: number;
  class_section?: string;
  avatar_url?: string;
  phone?: string;
  emergency_contact?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  grade_level_min: number;
  grade_level_max: number;
  category: 'fire' | 'earthquake' | 'flood' | 'general';
  content_type: 'poem' | 'simulation' | 'quiz' | 'video';
  content_data?: any;
  duration_minutes?: number;
  points_reward?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number;
  total_points: number;
  completion_percentage: number;
  time_spent_minutes: number;
  last_accessed_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface DrillLog {
  id: string;
  school_id: string;
  drill_type: 'fire' | 'earthquake' | 'lockdown' | 'evacuation';
  scheduled_at: string;
  started_at?: string;
  ended_at?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  total_participants: number;
  safe_count: number;
  missing_count: number;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface DrillParticipant {
  id: string;
  drill_log_id: string;
  user_id: string;
  status: 'safe' | 'missing' | 'unknown';
  check_in_time?: string;
  location?: string;
  marked_by?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  course_id?: string;
  teacher_id: string;
  school_id: string;
  grade_level?: number;
  class_section?: string;
  due_date?: string;
  total_points: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  answers?: any;
  score: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'graded';
  submitted_at?: string;
  graded_at?: string;
  graded_by?: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyAlert {
  id: string;
  school_id: string;
  alert_type: 'fire' | 'earthquake' | 'lockdown' | 'weather' | 'general';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  is_active: boolean;
  sent_at: string;
  expires_at?: string;
  created_by?: string;
  created_at: string;
}

export interface StudentParent {
  id: string;
  student_id: string;
  parent_id: string;
  relationship: 'parent' | 'guardian' | 'emergency_contact';
  is_primary: boolean;
  created_at: string;
}