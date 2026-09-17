# CampusFlow AI — Phase 3 Implementation

Phase 3 extends the prototype from personal productivity into campus operations while keeping authorization, auditability, and database constraints explicit.

## Implemented

### 1. Course management
- Course model with code, title, description, faculty, term, credits, schedule, room and active state.
- Unique course code per term.
- Faculty/admin create and update courses.
- Faculty ownership checks prevent one faculty member from modifying another faculty member's course.
- Students can list their active courses and enroll/drop.
- Faculty/admin can view a course roster.

### 2. Attendance
- Attendance session model tied to a course.
- Faculty/admin can create and close attendance sessions.
- Attendance records support present, absent, late and excused.
- Only actively enrolled students can receive attendance records.
- Unique `(session, student)` constraint prevents duplicate records.
- Faculty/admin course attendance reports include per-student percentage.
- Students can retrieve their attendance summary.

### 3. Notifications
- Task-due notification worker checks tasks due within 24 hours.
- Notifications use an idempotency key so repeated worker sweeps do not create duplicate reminders.
- Worker is disabled by default and can be enabled with `NOTIFICATION_WORKER_ENABLED=true`.
- Minimum interval is one minute; the default is five minutes.

### 4. Production-oriented request handling
- Slow requests over one second are logged with request correlation IDs.
- Health/readiness endpoints remain available for deployment checks.
- Existing rate limiting, Helmet, secure cookies, audit logging and graceful shutdown remain active.

### 5. Task consistency fix
- Task API validation now uses the same status values as the Mongoose model: `todo`, `in-progress`, `done`.

## API surface

- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/courses`
- `PUT /api/courses/:id`
- `POST /api/courses/:id/enroll`
- `DELETE /api/courses/:id/enroll`
- `GET /api/courses/:id/roster`
- `POST /api/attendance/sessions`
- `PATCH /api/attendance/sessions/:id/close`
- `PUT /api/attendance/sessions/:id/records`
- `GET /api/attendance/courses/:courseId/report`
- `GET /api/attendance/me`

All routes are authenticated and role/ownership restrictions are enforced server-side.

## Verification boundary

The code has been committed to the `fsd2-capstone-project` branch and the CI workflow was updated to syntax-check the new modules. Atlas deployment is intentionally not claimed here: the connected MongoDB Atlas account currently exposes an organization but no Atlas project through the available integration. A real Atlas project/cluster and its connection configuration must be selected before production data is written.

This document records implementation facts only. No benchmark, user-study, load-test, or research result is claimed until an actual experiment produces evidence.
