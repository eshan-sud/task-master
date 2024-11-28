# Task Master - Task Management Web Application

**Task Master** is a powerful task management full-stack `MERN-based` web application that allows users to efficiently manage their tasks with a wide range of features such as task sorting, calendar integration, notifications, & much more.

This application is ideal for individuals, teams, or organisations looking for a comprehensive tool to track, assign & prioritise tasks in real-time with minimal effort & cost

## Features (I have & will be implementing in the future)

<details open>
  <summary><strong>Task Management</strong></summary>
    
- **CRUD Tasks:** Create, Read, Update, Delete tasks.
- **Task Completion:** Checkmark tasks as completed.
- **Progress Tracking:** Track task completion progress.
- **Priority Levels:** Set priority levels for tasks (with default and customizable settings).
- **Time Tracking:** Track the time spent on each task.
- **Task Categories:** Organize tasks into default or custom categories.
- **Real-Time Task Allotment:** Allocate tasks in real-time.
- **Task Sharing/Collaboration:** Collaborate and share tasks with others.
- **Task Archive:** Archive completed tasks for future reference.
- **Recycle Bin:** Deleted tasks are stored for 30 days before permanent deletion.
- **Check Marking:** Mark tasks as completed or in progress.

</details>

<details open>
  <summary><strong>Search & Organisation</strong></summary>

- **Search & Sort:** Filter tasks based on various criteria (due date, priority, status, etc.).
- **Export/Import:** Export or import tasks in CSV or Excel formats.
- **Location-Based Reminders:** Get reminders based on your location.
- **Calendar & Google Maps Integration:** Sync tasks with your calendar and set location-based reminders using Google Maps.

</details>

<details open>
  <summary><strong>User Authentication & Security</strong></summary>

- [x] **Login/Register:** User authentication to create personal accounts.
- [Next] **Update/Delete:** Accounts updation & deletion.
- [x] **Password Reset (OTP):** Reset password using OTP sent to email.
- [Current] **Account Verification:** Verify account after registration (with a unique OTP) through email communication.
- **Token Refresh:** Implement JWT refresh tokens for secure, continuous sessions.
- **Logout Everywhere:** Log out from all devices simultaneously.
- **Session Expiry:** Expire tokens after a set duration and prompt re-login.
- [x] **Captcha on Register Form:** Add Captcha (Google's reCAPTCHA v2) to Register form & its API for added security.
- **Rate Limiting:** Prevent brute-force attacks on login or OTP endpoints.
- **Encryption:** Encrypt sensitive user data & use HTTPS to secure communications.
- **Audit Logging:** Track and log sensitive actions like logins & profile updates.

</details>

<details open>
  <summary><strong>User Interface & Experience</strong></summary>

- **Dark Mode:** Toggle between light and dark themes.
- **Offline Mode:** Access and manage tasks offline.
- **Custom Sound Effects:** Set custom sounds for different actions.
- **Voice Commands:** Control and manage tasks using voice commands.
- **Voice Memos:** Record and attach voice memos to tasks.
- **In-App Chat:** Communicate with team members via the in-app chat.
- **Chatbot (Landing Page):** Provide a chatbot interface on the landing page.

</details>

<details open>
  <summary><strong>Notifications</strong></summary>

- **Email Notifications:** Notify users about password resets, profile updates, etc.
- **Push Notifications:** Real-time updates and alerts.
- **Desktop Notifications:** Notifications on desktop for task updates, reminders, etc.
- **In-app Notifications:** For real-time alerts within the app (optional).
</details>

<details open>
  <summary><strong>Gamification & Productivity</strong></summary>

- **Point System:** Award points for task completion.
- **Leaderboard:** View rankings for individuals or teams based on task completion.

</details>

<details open>
  <summary><strong>Collaboration & Sharing</strong></summary>

- **Task Sharing/Collaboration:** Collaborate and share tasks with others.
- **In-App Chat:** Communicate with team members directly in the app.

</details>

<details open>
  <summary><strong>Task Customisation & Personalisation</strong></summary>

- **Task Categories:** Organize tasks into default or custom categories.
- **Custom Sound Effects:** Set personalized sounds for various task actions.
</details>

<details open>
  <summary><strong>Additional Enhancements</strong></summary>

- **Progress Tracking:** Monitor the progress of task completion over time.
- **Attachment Upload:** Attach files or documents to tasks.
- **Leaderboard:** View rankings for task completion across teams or individuals.
- **Voice Memos:** Attach voice recordings to tasks for additional context.

</details>

<details open>
  <summary><strong>Security Features</strong></summary>

- **Rate Limiting:** Prevent brute-force attacks.
- **Encryption:** Encrypt sensitive data and enforce HTTPS.
- **Audit Logging:** Log user actions for debugging and tracking.

</details>

<details open>
  <summary><strong>Authentication Enhancements</strong></summary>

- **Email Verification:** Verify email after registration.
- **JWT Token Refresh:** Secure user sessions by allowing token refresh.
- **Logout Everywhere:** Log users out from all devices at once.
- **Session Expiry:** Expire user tokens after a set duration.

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
> The build is minified and the filenames include the hashes

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
