# InsForge Backend Integration

This project now uses InsForge as the backend service for database, storage, and other backend functionality.

## What's Been Set Up

### 1. Database Schema
- **Schools**: Store school information
- **Users**: Students, teachers, parents, and admins with role-based access
- **Courses**: Safety training courses with grade-level targeting
- **User Progress**: Track student learning progress and completion
- **Drill Logs**: Safety drill scheduling and tracking
- **Drill Participants**: Individual participation in drills
- **Assignments**: Teacher-assigned scenario quizzes
- **Assignment Submissions**: Student quiz submissions and grading
- **Emergency Alerts**: Campus-wide emergency notifications
- **Student Parents**: Parent-child relationships

### 2. Sample Data
- Sample school: "Delhi Public School"
- Sample courses: Fire Safety, Earthquake, Flood Safety
- Sample student: Alex Kumar (Grade 7)
- Sample progress data and upcoming drills

### 3. Storage
- **Bucket**: `educational-assets` for storing course materials, videos, images

### 4. Code Structure
- `lib/insforge.ts` - InsForge client configuration
- `lib/types.ts` - TypeScript interfaces for all database tables
- `lib/database.ts` - Database utility functions with type safety
- Updated student dashboard and courses page with real data

## Environment Variables
```env
NEXT_PUBLIC_INSFORGE_BASE_URL=https://mrdh8z9d.us-west.insforge.app
NEXT_PUBLIC_INSFORGE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Testing the Integration

1. **Test API Route**: Visit `/api/test-db` to verify database connectivity
2. **Student Dashboard**: Visit `/student` to see real data from InsForge
3. **Courses Page**: Visit `/student/courses` to see courses with progress

## Next Steps

### Authentication Integration
Since you mentioned using Auth0, you'll need to:
1. Set up Auth0 configuration
2. Update the `MOCK_USER` constants in pages to use real Auth0 user data
3. Map Auth0 user IDs to InsForge user records

### Real-Time Features
InsForge supports real-time subscriptions for:
- Emergency alerts
- Drill status updates
- Live progress tracking

### File Storage
Use the `educational-assets` bucket for:
- Course videos and images
- Student avatars
- Emergency plan documents

## Database Operations Examples

```typescript
// Get courses for a grade level
const { data: courses } = await database.courses.getByGradeLevel(7);

// Update student progress
await database.progress.updateProgress(userId, courseId, {
  status: 'completed',
  completion_percentage: 100,
  score: 95
});

// Create emergency alert
await database.alerts.create({
  school_id: schoolId,
  alert_type: 'fire',
  severity: 'high',
  title: 'Fire Drill',
  message: 'Fire drill starting in 5 minutes'
});
```

## Available Database Functions

### Schools
- `database.schools.getAll()`
- `database.schools.getById(id)`
- `database.schools.create(school)`

### Users
- `database.users.getByRole(role, schoolId?)`
- `database.users.getById(id)`
- `database.users.getByAuth0Id(auth0Id)`
- `database.users.create(user)`
- `database.users.updateProfile(id, updates)`

### Courses
- `database.courses.getByGradeLevel(gradeLevel)`
- `database.courses.getById(id)`
- `database.courses.getAll()`

### Progress
- `database.progress.getByUser(userId)`
- `database.progress.updateProgress(userId, courseId, updates)`
- `database.progress.getStats(userId)`

### Drills
- `database.drills.getBySchool(schoolId, limit?)`
- `database.drills.create(drill)`
- `database.drills.updateStatus(id, status, updates?)`

### Assignments
- `database.assignments.getByTeacher(teacherId)`
- `database.assignments.getByStudent(studentId, gradeLevel, classSection?)`
- `database.assignments.create(assignment)`

### Emergency Alerts
- `database.alerts.getActive(schoolId)`
- `database.alerts.create(alert)`
- `database.alerts.deactivate(id)`

All functions return `{ data, error }` structure following InsForge SDK patterns.