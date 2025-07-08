# Task Master - Task Management Web Application

**Task Master** is a powerful task management `full-stack MERN-based web application` that allows users to efficiently manage their tasks with a wide range of features such as task sorting, calendar integration, notifications, & much more.

This application is ideal for individuals, teams, or organisations looking for a comprehensive tool to track, assign & prioritise tasks in real-time with minimal effort & cost

## Technologies Used:

- JavaScript

- Cloud

  - GCP (Google Cloud Platform)

- Database

  - MongoDB
  - Redis

- Frontend

  - React.js
  - Full Calendar
  - redux
  - axios
  - chart.js
  - date-fns
  - react-draggable
  - react-hot-toast
  - react-icons
  - react-router-dom
  - styled-components

- Backend

  - Node.js
  - bcrypt
  - body-parser
  - cookie-parser
  - cors
  - dotenv
  - express
  - express-rate-limiter
  - express-slow-down
  - helmet
  - jsonwebtoken
  - mongoose
  - multer
  - node
  - nodemailer
  - nodemon
  - router

## TODO

<details open>
  <summary><strong>Task Management</strong></summary>
    
- [Current] **CRUD Tasks:** Create, Read, Update, Delete tasks
- [] Task completion
  - [] Mark tasks as completed or pending (not In-Progress)
- [] Custom status pipelines (e.g., Not Started → In Progress → Review → Done)
- [] Drag & drop task prioritization within lists
- [] Task templates (for recurring workflows)
- [] Quick task creation modal via shortcut (eg, /new command)
- [] Add support for tasks dependent on other tasks / Ability to break down a larger tasks into smaller, more manageble tasks
- [] Allow tasks to repeat on a schedule (daily, weekly, quarterly, financial-yearly, yearly, etc) (Recurring Tasks)
- [] Set priority levels for tasks (with default & customisable settings)
- [] Add the ability to set & track task due dates
- [] Allow users to add detailed descriptions or notes to each task
- [] Organise tasks into default or custom categories
- [] Archive completed tasks for future reference
- [] Deleted tasks are stored in the recycle bin for 30 days before permanent deletion

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
  <summary><strong>Search & Organisation</strong></summary>

- [] Search & filter tasks based on various criteria (due date, priority, status, etc.)
  - [] Debouncing (frontend)
  - [] Throttling (frontend)
- [] Tagging System for easiar searching
- [] Sync tasks with Google Calendar + Outlook
- [] Two-way sync with Google Calendar + Outlook

</details>

<details open>
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
  <summary><strong>User Interface & Experience</strong></summary>

- [] Light/dark themes
- [] Offline mode
- [] Pinned messages/comments
- [] Meeting scheduling linked with task deadlines
- [] Sync offline updates with online database automatically when online
  - [] Resolve syncing issues with different devices syncing concurrently with different updates
- [] Have calendar notification from tasks
  - [] Natural Language Processing for due date parsing (eg, "next Monday at 5pm")
  - [] Smart task suggestions/reminders based on usage
  - [] Auto-prioritization using a weighted urgency matrix (Eisenhower matrix)
- [] Skeleton loaders & Lazy loading

</details>

<details open>
  <summary><strong>Notifications</strong></summary>

- [] Email notifications
  - [] Password changes
  - [] Profile updates
  - [] Task updates
- [] Push notifications
  - [] Password changes
  - [] Profile updates
  - [] Real-time updates/alerts
  - [] Tasks updates
  - [] Reminders
- [] Desktop notifications
  - [] Task updates
  - [] Reminders
- [] In-app notifications
  - [] Real-time
- [] Client location-based reminders notifications
- [] Missed/overdue task notifications
- [] Customisable task reminder settings - how & when users are to be notified (eg, push, email, or desktop, etc)

</details>

<details open>
  <summary><strong>Collaboration & Sharing</strong></summary>

- [] Real-time task allotment to team members
- [] Collaborate & share tasks with others
- [] Role-based access control (eg, admin, viewer) for shared tasks or team collaboration
  - [] Audit log dashboard for admin role
- [] Allow users to download their audit logs
- [] Task comments/mentions `@username` for effective communication or to put comments on tasks
- [] In-App chat app
  - [] Communicate with team members directly in the app
  - [] Real-Time
- [] Teams joining link sharing

</details>

<details open>
  <summary><strong>Additional Enhancements</strong></summary>

- [] Attach files or documents to tasks
- [] Leaderboard to view rankings for task completion across teams or individuals
- [] Record & attach voice memos to tasks for additional context
- [] Allow undo for accidental deletions or updates (eg, restore deleted tasks) on pressing `Cntrl + Z`
- [] Implement Message Queues
- [x] Under maintenance page for when page is in maintenance
- [x] "Something went wrong! Try again later." page (Timeout functionality)
- [] Export data (Optional)
  - [] PDF
  - [] CSV
  - [] Excel

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
- [] Add XSS protection
  - [x] Implement on backend
  - [] Implement on frontend
    - [] Sanitise user-generated content before rendering
    - [] Use strict CSP on frontend
- [] Add CSRF protection
  - [x] Implement on backend
  - [] Implement on frontend
    - [] Add CSRF token to context
- [x] Passwords are hashed & salted before pushing to database
- [] Encrypt sensitive user data
- [] Privacy Controls: Add user controls for account/tasks visibility, such as sharing tasks with specific people only
- [] MFA (Multi-Factor Authentication) support (eg, OTP + password) for enhanced account security
- [] Provide feedback during password creation to encourage strong passwords
- [] Audit log : track, log, & view sensitive actions like logins & profile updates (Optional)
- [] Implement SSL certificate
- [] Enforce HTTPS to secure communications

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

</details>

---

### (Available Scripts - For Devs)

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
