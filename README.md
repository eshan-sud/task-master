# Task Master - Task Management Web Application

**Task Master** is a powerful task management full-stack `MERN-based` web application that allows users to efficiently manage their tasks with a wide range of features such as task sorting, calendar integration, notifications, & much more.

This application is ideal for individuals, teams, or organisations looking for a comprehensive tool to track, assign & prioritise tasks in real-time with minimal effort & cost

## Features (I have & will be implementing in the future)

<details open>
  <summary><strong>Task Management</strong></summary>
    
- **CRUD Tasks:** Create, Read, Update, Delete tasks.
- **Task Completion:** Mark Tasks as Completed or In-Progress.
- **Task Dependencies/Subtasks:** Add support for tasks dependent on other tasks/Ability to break down a larger tasks into smaller, more manageble tasks.
- **Recurring Tasks:** Allow tasks to repeat on a schedule (daily, weekly, etc).
- **Priority Levels:** Set priority levels for tasks (with default & customisable settings).
- **Due Dates:** Add the ability to set and track task due dates.
- **Task Descriptions:** Allow users to add detailed descriptions or notes to each task.
- **Task Categories:** Organise tasks into default or custom categories.
- **Task Archive:** Archive completed tasks for future reference.
- **Recycle Bin:** Deleted tasks are stored for 30 days before permanent deletion.

</details>

<details open>
  <summary><strong>Analysis</strong></summary>

- **Visualisation Dashboards:** Use graphs, pie charts, and histograms to present data (eg, task breakdown by category or completion status).
- **Time Tracking:** Track the time spent on each task.
- **Completion Trends:** Visualise how many tasks are completed over time using graphs or charts.
- **Missed Deadlines Report:** Generate reports of missed deadlines with reasons (eg, not started, in progress).
- **Task Prioritisation Insights:** Analyse the percentage of tasks marked as high, medium, or low priority.
- **Category Usage Statistics:** Show how tasks are distributed across categories.
- **Collaboration Metrics:** Analyse task distribution among collaborators.

</details>

<details open>
  <summary><strong>Search & Organisation</strong></summary>

- **Search & Sort:** Filter tasks based on various criteria (due date, priority, status, etc.).
- **Tagging System:** For searching easily
- **Export/Import Data:** Export or import tasks in CSV or Excel formats.
- **Calendar Integration:** Sync tasks with your calendar.

</details>

<details open>
  <summary><strong>User Authentication & Security</strong></summary>

- [x] **Login/Register:** User authentication to create personal accounts.
- [x] **Remember Me:** Remember me feature to reduce the number of times the user has to login back into their account.
- [x] **Password Change using OTP:** Change account password using OTP sent to email.
- [x] **Password Change while logged in:** Change account password using Settings page.
- [x] **Avatar Upload/Delte:**Add & delete avatar to user account.
- [x] **Captcha on Register Form:** Add Captcha (Google's reCAPTCHA v2) to Register form & its API for added security.
- [Next] **Update/Delete:** Accounts updation & deletion.
- [Current] **Account Verification:** Verify account after registration through email.
- [Current] **Settings:** Able to set account settings & more for more personalisation.

</details>

<details open>
  <summary><strong>User Interface & Experience</strong></summary>

- **Dark Mode:** Toggle between light & dark themes.
- **Offline Mode:** Access & manage tasks offline.
- **Offline Sync:** Able to sync tasks automatically when back online.
- **Multi-Language Support:** Add support for multiple languages.
- **Chatbot (Landing Page):** Provide a chatbot interface on the landing page.

</details>

<details open>
  <summary><strong>Notifications</strong></summary>

- **Email Notifications:** Notify users about password changes, profile updates, etc.
- **Push Notifications:** Real-time updates & alerts.
- **Desktop Notifications:** Notifications on desktop for task updates, reminders, etc.
- **In-app Notifications:** For real-time alerts within the app (optional).
- **Location-based Reminders Notifications:** Get reminders based on your location using client location.
- **Missed Task Notifications:** Notify users about overdue tasks.
- **Customisable Notifications:** Users may choose how & when they want to be notified (eg, via push, email, or desktop).

</details>

<details open>
  <summary><strong>Collaboration & Sharing</strong></summary>

- **Real-Time Task Allotment:** Allocate tasks to teams in real-time.
- **Task Sharing/Collaboration:** Collaborate & share tasks with others.
- **Role-Based Access Control:** Implement roles (eg, admin, viewer) for shared tasks or team collaboration.
- **Task Comments/Mentions:** Ability to mention @username for effective communication / to put comments on tasks
- **In-App Chat:** Communicate with team members directly in the app. (Optional : Real-Time in-app Chat app)

</details>

<details open>
  <summary><strong>Additional Enhancements</strong></summary>

- **Attachment Upload:** Attach files or documents to tasks.
- **Leaderboard:** View rankings for task completion across teams or individuals.
- **Voice Memos:** Record & attach voice memos to tasks for additional context.
- **Voice Commands:** Control & manage tasks & the app using voice commands.

</details>

<details open>
  <summary><strong>Security Features</strong></summary>

- **Rate Limiting:** Prevent brute-force attacks on login or OTP endpoints.
- **Encryption:** Encrypt sensitive user data & enforce HTTPS to secure communications.
- **Audit Logging:** Track & log sensitive actions like logins & profile updates.
- **Privacy Controls:** Add user controls for account/tasks visibility, such as sharing tasks with specific people only.
- **Multi-Factor Authentication (MFA)**: Add MFA (eg, OTP + password) for enhanced account security.
- **Password Strength Checker:** Provide feedback during password creation to encourage strong passwords.

</details>

<details open>
  <summary><strong>Authentication Enhancements</strong></summary>

- **Session Expiry:** Expire tokens after a set duration & prompt re-login.
- **Token Refresh:** Implement JWT refresh tokens for secure, continuous sessions.
- **Logout Everywhere:** Log out from all devices simultaneously.

</details>

<details open>
  <summary><strong>Authentication Enhancements</strong></summary>

- **Undo Actions**: Allow undo for accidental deletions or updates (eg, restore deleted tasks).

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
<details>
  <summary>Build</summary>

    npm run build

Builds the app for production to the `build` folder.

> Correctly bundles React in production mode & optimises the build for the best performance.
> The build is minified & the filenames include the hashes

</details>
<details>
  <summary>Eject</summary>

    npm run eject

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool & configuration choices, you can `eject` at any time

> This will remove the single build dependency from your project

</details>

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
