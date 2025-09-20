# Project Management System - Feature Checklist & Workflows

## Core Concepts

**What people do in a PMS:**
- Break down projects into manageable tasks
- Track progress and deadlines
- Collaborate with team members
- Monitor workload and priorities
- Document decisions and updates

**Basic Workflow:**
1. Create a project
2. Break it into tasks/milestones
3. Assign tasks (to self or others)
4. Set deadlines and priorities
5. Work on tasks and update status
6. Track overall progress
7. Complete project

## Essential Features Checklist

### 🔐 Authentication (Already Done)
- [x] User registration/login
- [x] JWT tokens
- [x] Password reset

### 👤 User Management
- [ ] **GET /users/profile** - Get current user profile
- [ ] **PUT /users/profile** - Update user profile (name, email, avatar)
- [ ] **GET /users/search** - Search users by email/name (for inviting)

### 🏢 Organization Management
- [ ] **POST /organizations** - Create organization
- [ ] **GET /organizations** - List user's organizations
- [ ] **GET /organizations/:id** - Get organization details
- [ ] **PUT /organizations/:id** - Update organization (admin only)
- [ ] **DELETE /organizations/:id** - Delete organization (admin only)
- [ ] **POST /organizations/:id/invite** - Invite user to organization
- [ ] **POST /organizations/:id/join** - Join organization (via invite code/link)
- [ ] **DELETE /organizations/:id/members/:userId** - Remove member
- [ ] **PUT /organizations/:id/members/:userId/role** - Update member role

### 📋 Project Management
- [ ] **POST /projects** - Create project (personal or org)
- [ ] **GET /projects** - List user's projects (personal + org projects)
- [ ] **GET /projects/:id** - Get project details
- [ ] **PUT /projects/:id** - Update project
- [ ] **DELETE /projects/:id** - Delete project
- [ ] **POST /projects/:id/members** - Add project member
- [ ] **DELETE /projects/:id/members/:userId** - Remove project member

### ✅ Task Management
- [ ] **POST /projects/:id/tasks** - Create task
- [ ] **GET /projects/:id/tasks** - List project tasks
- [ ] **GET /tasks/:id** - Get task details
- [ ] **PUT /tasks/:id** - Update task
- [ ] **DELETE /tasks/:id** - Delete task
- [ ] **PUT /tasks/:id/status** - Update task status
- [ ] **PUT /tasks/:id/assign** - Assign/unassign task

### 💬 Comments/Updates
- [ ] **POST /tasks/:id/comments** - Add comment to task
- [ ] **GET /tasks/:id/comments** - Get task comments
- [ ] **PUT /comments/:id** - Update comment
- [ ] **DELETE /comments/:id** - Delete comment

### 🔔 Notifications (Nice to have)
- [ ] **GET /notifications** - Get user notifications
- [ ] **PUT /notifications/:id/read** - Mark notification as read
- [ ] **PUT /notifications/read-all** - Mark all as read

## Data Models (Key Fields)

### User
```typescript
{
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}
```

### Organization
```typescript
{
  id: string
  name: string
  description?: string
  ownerId: string
  inviteCode: string
  createdAt: Date
  updatedAt: Date
}
```

### Project
```typescript
{
  id: string
  name: string
  description?: string
  status: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  startDate?: Date
  dueDate?: Date
  organizationId?: string // null for personal projects
  ownerId: string
  createdAt: Date
  updatedAt: Date
}
```

### Task
```typescript
{
  id: string
  title: string
  description?: string
  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  assigneeId?: string
  projectId: string
  createdById: string
  dueDate?: Date
  estimatedHours?: number
  actualHours?: number
  createdAt: Date
  updatedAt: Date
}
```

### Comment
```typescript
{
  id: string
  content: string
  taskId: string
  authorId: string
  createdAt: Date
  updatedAt: Date
}
```

## Common User Workflows

### Personal Project Workflow
1. User creates a personal project
2. Breaks it down into tasks
3. Sets priorities and deadlines
4. Works through tasks, updating status
5. Marks project as complete

### Team Project Workflow
1. Organization owner/admin creates project
2. Adds team members to project
3. Creates tasks and assigns them
4. Team members update task progress
5. Comments are added for collaboration
6. Project progresses through milestones

### Daily Usage Patterns
- Check assigned tasks
- Update task status
- Add comments/updates
- Review project progress
- Create new tasks as needed

## Nice-to-Have Features (Low Priority)
- File attachments to tasks
- Task dependencies
- Time tracking with start/stop timer
- Activity logs/audit trail
- Project templates
- Gantt chart data endpoints
- Dashboard analytics
- Task labels/tags
- Due date reminders
