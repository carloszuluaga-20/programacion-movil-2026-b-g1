# Student Attendance — Week 14

Student Attendance is an Ionic React mobile application developed for the Week 14 activity of the Mobile Programming course.

The application allows a teacher to log in, view student records, review attendance information, and capture photographic evidence using the Capacitor Camera plugin.

## Technologies

- Ionic React and TypeScript
- Vite
- Capacitor 8
- Capacitor Camera
- Node.js and Express
- JSON Web Tokens (JWT)
- Vitest and React Testing Library

## Main Features

- Teacher authentication using email and password.
- JWT-based access to protected API endpoints.
- Protected navigation between application screens.
- Student listing retrieved from the API.
- Attendance listing retrieved from the API.
- Camera integration for photographic evidence.
- Loading, empty, error, and retry states.
- Handling of expired sessions and connection failures.

## Project Structure

```text
student-attendance-app/
├── api/                 # Express backend
├── android/             # Capacitor Android project
├── src/
│   ├── pages/           # Application screens
│   ├── services/        # API client and unit tests
│   ├── App.tsx
│   └── App.test.tsx
├── capacitor.config.ts
└── package.json
```

## Requirements

- Node.js and npm
- A modern web browser
- Android Studio and Android SDK (optional for native Android testing)

## Backend Setup

Open a terminal in the `api` directory and install the dependencies:

```bash
npm install
```

The backend requires the following environment variables:

- `JWT_SECRET`: a secret containing at least 32 bytes.
- `DEMO_EMAIL`: the email used for demonstration login.
- `DEMO_PASSWORD`: the password used for demonstration login.

Example for Windows PowerShell:

```powershell
$env:JWT_SECRET = ([guid]::NewGuid().ToString("N") + [guid]::NewGuid().ToString("N"))
$env:DEMO_EMAIL = "teacher@example.com"
$env:DEMO_PASSWORD = "StudentDemo2026!"
node index.js
```

The backend runs at `http://localhost:3000`.

These credentials are intended only for local demonstration. Do not commit real credentials or production secrets.

## Frontend Setup

Open another terminal in the `student-attendance-app` directory:

```bash
npm ci
npm run dev
```

Open the local URL displayed by Vite and log in using the credentials configured in the backend.

By default, the application connects to:

```text
http://localhost:3000
```

A different API URL can be configured using the `VITE_API_URL` environment variable before building the frontend.

## API Endpoints

| Method | Endpoint | Authentication |
|---|---|---|
| GET | `/api/health` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/students` | JWT required |
| GET | `/api/students/:id` | JWT required |
| GET | `/api/attendance` | JWT required |
| GET | `/api/attendance/student/:studentId` | JWT required |

Protected requests use the `Authorization: Bearer TOKEN` header.

## Camera Integration

The application integrates the `@capacitor/camera` plugin.

Users can open the camera feature, capture or select a photo depending on the available platform, preview the image, and remove it.

The application includes logic to check and request native camera permissions when applicable, and to handle cancellation or errors.

The camera feature has been exercised in a web browser. Native Android permission behavior still requires testing on an Android device or emulator.

## Quality & connectivity

The application uses JWT authentication to protect access to student and attendance information.

Protected API requests include the authentication token in the Authorization header.

When the API returns HTTP 401, the application displays an authentication error and directs the user to log in again.

When a network request fails, the application shows a clear connection error instead of silently failing.

Student and attendance screens provide loading, empty, error, and retry states to improve usability.

The application includes automated unit tests for login requests, authenticated API access, HTTP errors, and network failures.

The Capacitor Camera plugin supports photographic evidence and includes permission-handling logic for native platforms.

## Testing

Run all frontend unit tests:

```bash
npm run test.unit -- --run
```

Validate TypeScript:

```bash
npx tsc --noEmit
```

Build the application:

```bash
npm run build
```

At the time of this documentation update, seven frontend tests passed across two test files.

The tests mock API responses and do not require the Express server to be running.

## Android

The Android platform has been generated and synchronized using Capacitor:

```bash
npm run build
npx cap sync android
```

Android Studio can be used to open and run the native project:

```bash
npx cap open android
```

Before testing API access on Android, configure an API address reachable from the device or emulator. The Android emulator commonly uses `10.0.2.2` to access a server running on the host computer. A local HTTP connection may also require Android network security configuration.

Native Android execution and permission verification are pending.

## Academic Context

- Course: Mobile Programming
- Activity: Week 14 — Optional Activity
- Project: Student Attendance
- Purpose: Demonstrate a Capacitor device plugin, JWT authentication, protected API consumption, connectivity handling, and automated tests.
