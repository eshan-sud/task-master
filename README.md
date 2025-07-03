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
  - Express.js
  - bcrypt
  - body-parser
  - cookie-parser
  - cors
  - dotenv
  - express-rate-limiter
  - express-slow-down
  - jsonwebtoken
  - mongoose
  - multer
  - nodemailer
  - nodemon
  - router

## TODO

Message Queues

<details open>
  <summary><strong>Task Management</strong></summary>
    
- [Current] **CRUD Tasks:** Create, Read, Update, Delete tasks
- [] Task completion
  - [] Mark tasks as completed or pending (not In-Progress)
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
- [] Tagging System for easiar searching
- [] Sync tasks with Google calendar, etc

</details>

<details open>
  <summary><strong>User Authentication & Security</strong></summary>

- [x] Basic login/register
- [x] Remember me feature
- [x] Password change using OTP on email
- [x] Add/delete avatar
- [x] Captcha on registration form (Google's reCAPTCHA v2)
- [x] Profile update
  - [x] Profile name
  - [x] Bio
- [x] Clean account deletion (with no additional data stored on server/database)
- [x] Account verification through email
- [x] Settings
  - [x] Account
  - [x] Password change
  - [x] More personalisation
- [] Export data (Optional)
  - [] PDF
  - [] CSV
  - [] Excel

</details>

<details open>
  <summary><strong>User Interface & Experience</strong></summary>

- [] Light/dark themes
- [] Offline mode
- [] Sync offline updates with online database automatically when online
  - [] Resolve syncing issues with different devices syncing concurrently with different updates

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
- [] Task comments/mentions `@username` for effective communication or to put comments on tasks
- [] In-App chat app
  - [] Communicate with team members directly in the app
  - [] Real-Time (Optional)

</details>

<details open>
  <summary><strong>Additional Enhancements</strong></summary>

- [] Attach files or documents to tasks
- [] Leaderboard to view rankings for task completion across teams or individuals
- [] Record & attach voice memos to tasks for additional context
- [] Allow undo for accidental deletions or updates (eg, restore deleted tasks) on pressing `Cntrl + Z`

</details>

<details open>
  <summary><strong>Security Features</strong></summary>

- [] Rate Limiting on Login or OTP endpoints
- [] Delay spammed queries
- [] Passwords are hashed & salted before pushing to database
- [] Encrypt sensitive user data & enforce HTTPS to secure communications
- [] Track, log, & view sensitive actions like logins & profile updates
- [] Privacy Controls: Add user controls for account/tasks visibility, such as sharing tasks with specific people only
- [] MFA (Multi-Factor Authentication) support (eg, OTP + password) for enhanced account security
- [] Provide feedback during password creation to encourage strong passwords

</details>

<details open>
  <summary><strong>Authentication Enhancements</strong></summary>

- [] Expire session tokens after a set duration & prompt re-login
- [] Implement JWT Refresh Tokens for secure, continuous sessions
- [] Manage all sessions based on MAC address (max devices of 3)
  - [] Log out from all devices simultaneously

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

- [] Load balancers
- [] CDNs (if required)
- [] Distributed Databases
  - [] Sharding & Replication in Databases
- [] Redis cache

</details>

---

### (Available Scripts - For Devs)

<details>
  <summary>Start</summary>
    
    npm start

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
