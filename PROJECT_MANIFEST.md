# Project Manifest: SurakshaSetu Platform

## 1. Project Overview
**Mission**: To bridge the gap in disaster preparedness in Indian educational institutions by replacing reactive measures with proactive, gamified, and curriculum-integrated digital training.
**Core Value**: Transforming "boring" safety drills into engaging, life-saving habits through a "Kids-First" design philosophy.
**Business Model**: B2B SaaS Platform sold directly to Educational Institutions (Schools/Colleges).

---

## 2. Content Strategy & Curriculum
*Tailored learning paths based on Grade Level.*

### Junior Wing (Grades K-8)
*Focus: Memorization through Rhyme & Pattern*
- **Safety Poems**: Attention-grabbing rhymes covering key survival skills.
    - *Topics*: "Stop, Drop, Roll" (Fire), "Duck and Cover" (Quake), "Get to High Ground" (Flood).
- **Gamification**: Simple point-and-click interactions, Badge collection, Animated storytelling.

### Senior Wing (Grades 9-12)
*Focus: Practical Application & Simulation*
- **VR Mock Drills**: Immersive virtual reality experiences simulating real-world disasters.
    - *Scenarios*: Navigating smoke-filled corridors, Identifying structural risks, First-Aid response.
- **Advanced Labs**: Decision-making under pressure.

### Homework & Assessment
- **Scenario-Based Quizzes**: Teachers assign interactive homework where students must solve disaster scenarios (e.g., "You smell gas. What do you do first?").
- **Verification**: Teachers receive detailed analytics on student choices to identify knowledge gaps.

---

## 3. Frontend Architecture & Goals

### Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v3.4), Shadcn/UI (Primitives)
- **Animation**: Framer Motion
- **Icons**: Lucide React

### Design Philosophy ("The Kids Aesthetic")
- **Visuals**: Light mode only. High-saturation pastel palette (Mint, Pink, Purple, Orange).
- **Typography**: `Nunito` (Rounded, friendly, highly readable).
- **Layout**: "Bento Grid" interactive dashboards. Rounded corners (`rounded-[2.5rem]`).
- **Interaction**: Micro-animations on hover, gamified feedback (confetti, progress bars).

### Role-Based Experiences
1.  **Student**: 
    - Gamified Learning Management System (LMS).
    - Virtual Labs (Evacuation Sims).
    - "Fun Zone" for safety trivia/games.
2.  **Teacher**: 
    - Class roster management.
    - Drill scheduling & compliance tracking.
    - **Assignment Tools**: Deploy scenario-based quizzes.
    - Safe/Unsafe student marking during emergencies.
3.  **Parent**: 
    - Real-time child safety status.
    - Emergency family plans.
    - Drill participation stats.
4.  **Admin**: 
    - Campus-wide "Command Center".
    - IoT Integration monitoring (simulated).
    - Emergency Alert Trigger System.

---

## 4. Backend Goals (Planned Architecture)

### Core Infrastructure
- **Database**: PostgreSQL (via Supabase or Neon).
    - **Tables**: `Users`, `Schools`, `DrillLogs`, `Courses`, `UserProgress`, `EmergencyAlerts`, `Assignments`.
- **API**: Next.js Server Actions & API Routes.

### Key Features to Implement
1.  **User Management**:
    - Role-based access control (RBAC) middleware.
    - Profile management for students (Avatar customization).
2.  **Drill Engine**:
    - Logic to schedule recurring drills.
    - Real-time "Check-in" API for teachers during live drills.
3.  **Analytics Engine**:
    - Aggregation of drill performance data.
    - Campus readiness scoring algorithms.
4.  **Content Management**:
    - Admin tools to update safety modules/quizzes without code changes.

---

## 5. Third-Party Services & Integrations

### Authentication & Security
- **Goal**: Secure, compliant (COPPA/GDPR friendly) login.
- **Provider**: **Clerk** or **Auth.js** (formerly NextAuth).
    - *Why*: Easy support for social logins and multi-tenant (school) architecture.

### Database & Storage
- **Goal**: Scalable relational data and asset storage.
- **Provider**: **Supabase** or **Neon** (PostgreSQL).
    - *Why*: Built-in Realtime capabilities (Supabase) are crucial for emergency alerts.
- **Storage**: AWS S3 or Supabase Storage (for educational videos/assets).

### Real-Time Communication
- **Goal**: Instant alerts during drills/emergencies.
- **Provider**: **Pusher** or **Supabase Realtime**.
    - *Usage*: Triggering the "Red Alert" mode across all connected client dashboards instantly.

### Notifications (SMS/Email)
- **Goal**: Urgent broadcast to parents/staff.
- **Provider**: **Twilio** (SMS/WhatsApp) or **Resend** (Email).
    - *Usage*: "Earthquake Drill Started: Leo is marked Safe."

### Geolocation & Mapping
- **Goal**: Safe zone visualizers and evacuation routes.
- **Provider**: **Mapbox** or **Google Maps Platform**.
    - *Usage*: Interactive campus map for Admin/Teacher view.

---

## 6. Development Roadmap

- [x] **Phase 1: UI/UX Foundation** (Complete)
    - Architecture setup.
    - Role-based routing.
    - "Kids" Theme implementation.
    - Static Content implementation.
- [ ] **Phase 2: Data & Auth** (Next)
    - Database schema design.
    - Authentication integration.
    - Hooking up "Static" dashboards to real DB data.
- [ ] **Phase 3: Real-Time Features**
    - Live Drill mode.
    - Emergency Chat/Status updates.
- [ ] **Phase 4: Expansion**
    - AI-driven safety quizzes.
    - Integration with actual school hardware (optional).
    - VR Module integration for Grades 9-12.
