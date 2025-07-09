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
  - crypto
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
- [] Prevent web scraping
  - [x] Robots.txt
  - [x] Captchas
  - [x] Rate Limiting
  - [] IP Blocking (Use extra links that can't be found by any user, but a web scrapper could & if they visit that link, we block that IP address from accessing the content)
- [] Add XSS protection
  - [x] Implement on backend
  - [] Implement on frontend
    - [] Sanitise user-generated content before rendering
    - [] Use strict CSP on frontend
- [] Add CSRF protection
  - [x] Implement on backend
  - [] Implement on frontend
    - [] Add CSRF token to context
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
- [] Task creation on frontend
- [x] File upload
  - [] Backend
  - [] Frontend
- [] Custom task status pipelines (eg, Intial → Pending → Started → Review → Completed)
- [] Drag & drop task prioritization within lists
- [] Recurring tasks
- [] Encrypted tasks w/ end-to-end encryption (only available on user's own private key not stored anywhere using AES-256)
- [] Quick task creation modal via shortcut (eg, /new command)
- [] Add support for tasks dependent on other tasks / Ability to break down a larger tasks into smaller, more manageble tasks
- [] Allow tasks to repeat on a schedule (daily, weekly, quarterly, financial-yearly, yearly, etc) (Recurring Tasks)
- [] Set priority levels for tasks (with default & customisable settings)
- [] Add the ability to set & track task due dates
- [] Allow users to add detailed descriptions or notes to each task
- [] Organise tasks into default or custom categories
- [] Archive completed tasks
- [] Recycle bin (30 day lifecycle)

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
  <summary><strong>Collaboration & Sharing</strong></summary>

- [] Real-time task allotment to team members
- [] Collaborate & share tasks with others
- [] Role-based access control (eg, admin, viewer) for shared tasks or team collaboration
  - [] Audit log dashboard for admin role
- [] Allow users to download their audit logs
- [] Task comments/mentions `@username` for effective communication or to put comments on tasks
- [] In-App chat app
  - [x] User Interface
  - [] Communicate with team members directly in the app
  - [] Real-Time
  - [] End-to-end encryption
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
  - [x] Password changes
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
