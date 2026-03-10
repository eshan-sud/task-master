# Task Master - Task Management Web Application

**Task Master** is a powerful task management `full-stack MERN-based web application` that allows users to efficiently manage their tasks with a wide range of features such as task sorting, calendar integration, notifications, & much more.

This application is ideal for individuals, teams, or organisations looking for a comprehensive tool to track, assign & prioritise tasks in real-time with minimal effort & cost

## Technologies Used:

- Programming Languages
  - JavaScript

- Package Manage
  - npm

- Cloud
  - GCP (Google Cloud Platform) or AWS (Amazon Web Services)

- Database
  - MongoDB
  - Redis (Cache)

- Frontend
  - Vite
  - React.js
  - Full Calendar
  - Redux Toolkit
  - react-redux
  - axios
  - chart.js
  - date-fns
  - react-draggable
  - @dnd-kit/core
  - @dnd-kit/sortable
  - @dnd-kit/utilities
  - react-hot-toast
  - react-icons
  - react-router-dom
  - styled-components
  - socket.io-client

  (To Be Used) :-
  - React Tooltip
  - React Helmet
  - React Spinners
  - React bits
  - OAuth2

- Backend
  - Node.js
  - bcrypt
  - body-parser
  - cookie-parser
  - cors
  - crypto
  - dotenv
  - express
  - express-rate-limiter
  - express-slow-down
  - express-mongo-sanitize
  - helmet
  - http (for Socket.io server)
  - jsonwebtoken
  - mongoose
  - multer
  - node
  - nodemailer
  - nodemon
  - router
  - socket.io

## TODO

<details closed>
  <summary><strong>User Authentication</strong></summary>

- [x] Basic login/register
- [x] Remember me feature for presistent login
- [x] Change password using OTP
  - [x] Email
- [x] Add/delete avatar
- [x] Captcha on registration form (Google's reCAPTCHA v2)
- [x] Profile update
  - [x] Profile name
  - [x] Bio
- [x] Clean account deletion (without any data stored on server/database)
- [x] Account verification
  - [x] Email
- [x] Settings
  - [x] Account
  - [x] Password change
  - [x] More personalisation

</details>

<details open>
  <summary><strong>Security Features</strong></summary>

- [x] Session management
  - [x] Implement Refresh Tokens for secure & continuous sessions
  - [x] Expire session tokens after a set duration
  - [x] Manage upto 5 sessions (each lasting 7 days)
  - [x] LRU session strategy
  - [x] Device deduplication
  - [x] Log out from all devices simultaneously
- [x] Cookie-based Token Delivery
- [x] Rate limiting
- [x] Delay spammed queries
- [] XML, SQL, DLL, LDAP injection protection
- [] Prevent web scraping
  - [x] Robots.txt
  - [x] Captchas
  - [x] Rate Limiting
  - [] IP Blocking (Use extra links that can't be found by any user, but a web scrapper could & if they visit that link, we block that IP address from accessing the content)
- [x] Add XSS protection
  - [x] Implement on backend
  - [x] Implement on frontend
    - [x] Sanitise user-generated content before rendering (DOMPurify)
      - [x] Created comprehensive sanitize.js utility with 6 sanitization functions
      - [x] Applied sanitization to TaskCard descriptions
      - [x] Applied sanitization to CommentItem content
      - [x] Applied sanitization to ChatWindow messages
    - [] Use strict CSP on frontend (Content-Security-Policy meta tag)
      - Note: CSP temporarily disabled in development due to backend on different port (localhost:8000)
      - TODO: Re-enable in production with proper connect-src configuration
- [x] Add CSRF protection
  - [x] Implement on backend
  - [x] Implement on frontend
    - [x] Created CSRF Redux slice for token management
    - [x] Added CSRF token fetching utility in api.service.js
    - [x] Automatic token inclusion in all API request headers (X-CSRF-Token)
    - [x] Initialize CSRF token on app load in App.jsx
    - [x] Token stored in Redux with loading and error states
- [x] Performance Optimizations
  - [x] React.memo for component memoization
    - [x] TaskCard wrapped with React.memo
    - [x] CommentItem wrapped with React.memo
    - [x] NotificationItem wrapped with React.memo
  - [x] useCallback for event handler memoization
    - [x] All TaskCard event handlers memoized
    - [x] CommentItem handlers optimized
    - [x] NotificationItem handlers optimized
  - [x] useMemo for expensive calculations
    - [x] Analytics statistics calculations memoized
    - [x] Analytics trend data generation memoized
    - [x] Analytics chart data memoized
    - [x] TaskCard date calculations memoized
    - [x] CommentItem content rendering memoized
    - [x] NotificationItem icon/title memoized
  - [x] Debouncing (TaskSearch component - already implemented)
  - [x] Code splitting with React.lazy (11 pages lazy-loaded)
- [] Protection against Eavesdropping & MiTM (Man-in-the-Middle) attacks
  - [] Implement SSL certificate from `Let's Encrypt`
  - [] Add CertBot to renew SSL certificate automatically
  - [] Enforce HTTPS to secure communications
- [x] E2EE (End-to-end encryption) functions
- [] Encrypted file uploads
- [x] Passwords are hashed & salted before storing in database
- [] Privacy Controls: Add user controls for account/tasks visibility, such as sharing tasks with specific people only
- [] MFA (Multi-Factor Authentication) support (eg, OTP + password) for enhanced account security
- [] Provide feedback during password creation to encourage strong passwords
- [] Audit logs: track, log, & view sensitive actions like logins & profile updates (Optional)

</details>

<details open>
  <summary><strong>Task Management</strong></summary>

- [x] CRUD endpoints on backend
- [x] Task creation on frontend
  - [x] Task creation modal with full form
  - [x] Task editing with inline updates
  - [x] Task cards (grid & list views)
  - [x] Task filters (status, priority, category)
  - [x] Task search with real-time results
  - [x] Bulk operations UI (select multiple, bulk actions)
- [x] File upload
  - [x] Backend
  - [x] Frontend (attachments in task modal)
- [] Custom task status pipelines (eg, Intial → Pending → Started → Review → Completed)
- [x] Drag & drop task prioritization within lists
  - [x] Kanban board view with drag & drop functionality
  - [x] Drag between columns to change task status
  - [x] Reorder tasks within columns
  - [x] Three-way view toggle (grid/list/kanban)
  - [x] Backend reorder endpoint
- [x] Recurring tasks
- [] Encrypted tasks w/ end-to-end encryption (only available on user's own private key not stored anywhere using AES-256)
- [] Quick task creation modal via shortcut (eg, /new command)
- [x] Add support for tasks dependent on other tasks / Ability to break down a larger tasks into smaller, more manageble tasks
- [x] Allow tasks to repeat on a schedule (daily, weekly, quarterly, financial-yearly, yearly, etc) (Recurring Tasks)
- [x] Set priority levels for tasks (with default & customisable settings)
- [x] Add the ability to set & track task due dates
- [x] Allow users to add detailed descriptions or notes to each task
- [x] Organise tasks into default or custom categories
- [x] Archive completed tasks
- [x] Recycle bin (30 day lifecycle)
- [x] Bulk operations (update, delete multiple tasks)
  - [x] Backend API
  - [x] Frontend UI with bulk actions bar
- [x] Search and filter tasks with advanced filters
  - [x] Backend search API
  - [x] Frontend search component with debouncing
  - [x] Advanced filters (status, priority, category, sort)
- [x] Task statistics and analytics
  - [x] Backend aggregation API
  - [x] Frontend charts & dashboards
    - [x] Chart.js integration with react-chartjs-2
    - [x] StatCard component for key metrics display
    - [x] TasksTrendChart (line chart with 7-day trend)
    - [x] PriorityDistributionChart (doughnut chart)
    - [x] CategoryDistributionChart (horizontal bar chart)
    - [x] Comprehensive Analytics page with real-time data
    - [x] Dark mode support for all charts
    - [x] Performance summary section
- [x] Real-time task updates
  - [x] Socket.io client integration with Redux
  - [x] Real-time task creation/update/deletion sync
  - [x] Real-time archive notifications
  <!-- - [x] Bulk operations (update, delete multiple tasks)
- [x] Search and filter tasks with advanced filters
- [x] Task statistics and analytics -->

</details>

<details open>
  <summary><strong>Search & Organisation</strong></summary>

- [x] Search & filter tasks based on various criteria (due date, priority, status, etc.)
  - [x] Debouncing (frontend - TaskSearch component)
  - [] Throttling (frontend - for scroll events if needed)
- [] Tagging System for easiar searching
- [] Sync tasks with Google Calendar + Outlook
- [] Two-way sync with Google Calendar + Outlook

</details>

<details open>
  <summary><strong>Collaboration & Sharing</strong></summary>

**🔴 REAL-TIME INFRASTRUCTURE ACTIVE** - All collaboration features powered by Socket.io with instant synchronization across devices

- [x] Real-time task allotment to team members (Backend)
- [x] Collaborate & share tasks with others (Backend)
- [x] Role-based access control (eg, admin, viewer) for shared tasks or team collaboration
  - [] Audit log dashboard for admin role
  - [x] Add permissions
- [] Allow users to download their audit logs
- [x] Task comments/mentions `@username` for effective communication or to put comments on tasks
  - [x] Backend API
  - [x] Frontend comments component
  - [x] Mention detection and highlighting
  - [x] Emoji reactions support
  - [x] Real-time comment updates via Socket.io
- [x] In-App chat app
  - [x] User Interface (MessagesPage, ChatWindow, ConversationList)
  - [x] Communicate with team members directly in the app (Backend)
  - [x] Real-Time (Backend)
  - [x] Real-Time Socket.io integration (Frontend)
  - [x] Typing indicators
  - [x] Message delivery and read receipts
  - [] E2EE (End-to-end encryption)
- [x] Teams management
  - [x] Backend (Create/update/delete teams, Add/remove members)
  - [x] Frontend UI (TeamsPage, TeamCard, CreateTeamModal)
  - [x] Role-based permissions (owner, admin, member, viewer)
  - [x] Member management interface
  - [x] Real-time user presence indicators (online/offline status)
- [] Teams joining link sharing

</details>

<details open>
  <summary><strong>Analysis</strong></summary>

- [] Visualisation dashboards (eg, task breakdown by category or completion status)
  - [] Graphs
  - [] Pie Charts
  - [] Histograms
- [] Track time spent on each task
- [] Visualise how many tasks are completed over time using graphs or charts
- [] Generate reports of missed deadlines with reasons (eg, not started, in progress)
- [] Analyse the percentage of tasks marked as high, medium, or low priority
- [] Show how tasks are distributed across categories
- [] Analyse task distribution among collaborators

</details>

<details open>
  <summary><strong>User Interface & User Experience</strong></summary>

- [x] Light/dark themes
  - [x] Theme toggle button in navigation
  - [x] Smooth transitions between themes
  - [x] Persistent theme preference (localStorage)
  - [x] Dark mode support across all components
  - [x] Automatic dark/light class application to root element
- [] Offline mode
- [] Pinned messages/comments
- [] Meeting scheduling linked with task deadlines
- [] Sync offline updates with online database automatically when online
  - [] Resolve syncing issues with different devices syncing concurrently with different updates
- [] Have calendar notification from tasks
  - [] Natural Language Processing for due date parsing (eg, "next Monday at 5pm")
  - [] Smart task suggestions/reminders based on usage
  - [] Auto-prioritization using a weighted urgency matrix (Eisenhower matrix)
- [x] Skeleton loaders & Lazy loading
  - [x] TaskCardSkeleton for task loading states
  - [x] NotificationItemSkeleton and NotificationListSkeleton
  - [x] TeamCardSkeleton and TeamGridSkeleton
  - [x] MessageSkeleton, ChatWindowSkeleton, ConversationItemSkeleton
  - [x] PageLoader for route-level loading
  - [x] React.lazy for code splitting (all pages)
  - [x] Suspense boundaries in App.jsx
  - [x] Centralized skeleton exports via index.js

</details>

<details open>
  <summary><strong>Notifications</strong></summary>

- [x] Email notifications (Backend)
  - [x] Password changes
  - [] Profile updates
  - [] Task updates
- [x] Push notifications (Backend infrastructure ready)
  - [] Password changes
  - [] Profile updates
  - [x] Real-time updates/alerts (Socket.io integration)
  - [x] Tasks updates (real-time)
  - [] Reminders
- [] Desktop notifications
  - [] Task updates
  - [] Reminders
- [x] In-app notifications
  - [x] Backend API (Real-time, notification types, mark as read)
  - [x] Frontend UI (NotificationsCenter, NotificationItem)
  - [x] Notification system with 13 types (task_assigned, task_shared, comment_added, mention, etc.)
  - [x] Mark as read & mark all as read functionality
  - [x] Unread count tracking
  - [x] Filter notifications (all, unread, read)
  - [x] Delete notifications
  - [x] Real-time notification delivery via Socket.io
- [] Client location-based reminders notifications
- [] Missed/overdue task notifications
- [] Customisable task reminder settings - how & when users are to be notified (eg, push, email, or desktop, etc)

</details>

<details open>
  <summary><strong>Additional Enhancements</strong></summary>

- [] Attach files or documents to tasks
- [] Leaderboard to view rankings for task completion across teams or individuals
- [] Record & attach voice memos to tasks for additional context
- [] Button control
  - [] Allow undo on pressing `Cntrl + Z`
  - [] Allow redo on pressing `Cntrl + Y`
- [] Implement Message Queues
- [x] Under maintenance page for when page is in maintenance
- [x] "Something went wrong! Try again later." page (Timeout functionality)
- [] Export data (Optional)
  - [] PDF
  - [] CSV
  - [] Excel

</details>

<details open>
  <summary><strong>Accesibility</strong></summary>

- [] Set accessibility on first login
- [] Control & manage the app using voice commands
- [] Have colourblind-adjusted setting
- [] Multi-language support
- [] RAG Chatbot (Landing Page)

</details>

<details open>
  <summary><strong>Deployement</strong></summary>

- [] Deploy MongoDB database to MongoDB Atlas
- [] Deploy Frontend to AWS
- [] Deploy Backend to AWS
- [] Setup CICD pipeline
- [] Integration testing

</details>

<details open>
  <summary><strong>Cloud Solutions</strong></summary>

- [] Buy domain
- [] Dockerize frontend & backend for portability
- [] Use Nginx as a reverse proxy for production
- [] Use Terraform/Ansible for infrastructure as code (future scale)
- [] Load balancers
- [] CDNs (if required)
- [] Distributed Databases
  - [] Sharding & Replication in Databases
- [] Redis cache

</details>

<details open>
  <summary><strong>Mobile App</strong></summary>

- [] Initial setup of React Native app
- [] All features in the mobile app too
- [] Add Widgets
- [] Push notifications
  - [] Password changes
  - [] Profile updates
  - [] Real-time updates/alerts
  - [] Tasks updates
  - [] Reminders
- [] Light/Dark mode (Default -> System)

  </details>

<details open>
  <summary><strong>Watch App</strong></summary>

- [] Frontend
- [] Incoming task notification

</details>

---

## (Available Scripts - For Devs)

<details>
  <summary>Start</summary>
    
    npm run dev:all

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

> You may also see any lint errors in the console.

</details>
<details>
  <summary>Test (To be written)</summary>

    npm test

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

</details>

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
