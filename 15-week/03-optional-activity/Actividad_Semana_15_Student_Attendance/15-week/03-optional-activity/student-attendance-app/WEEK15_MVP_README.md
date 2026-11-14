# Week 15 — Student Attendance MVP

## Problem
Manual attendance collection can be slow and difficult to audit. Student Attendance offers a small teacher-oriented workflow for viewing students and attendance records and capturing optional photographic evidence.

## MVP flow
1. **Teacher Login:** enter the credentials configured on the Express API. The API returns a short-lived JWT. The token is kept in memory, not browser local storage.
2. **Home → Students:** navigate to the protected students list. The UI shows loading, results, empty state, and network/HTTP errors. Search is memoized to avoid redundant filtering.
3. **Students → Attendance:** open the protected attendance history; refresh records or inspect empty/error states. A demonstration selector from week 11 is retained for UX verification and is **not real API data**.
4. **Attendance → Camera Evidence:** take and preview an optional photo with Capacitor Camera. On Android, permission is requested and denial is explained. The photo is **not uploaded or persisted**.
5. **Sign out:** clear the in-memory token. A 401 from a protected request also clears the session and returns to login.

## Technology choices
- **Ionic React + TypeScript:** mobile-friendly accessible UI and typed application state.
- **React Router:** clear page-to-page navigation and protected routes.
- **Capacitor Camera:** native Android camera access and permission handling; browser behavior differs from native behavior.
- **Express + JWT:** small demonstration API with authenticated `/api/students` and `/api/attendance` endpoints.
- **Vitest:** automated checks for student filtering and API behavior.
- **Vite:** fast local development and production build.

## Run the API (terminal 1)
```powershell
cd api
npm install
Copy-Item .env.example .env
notepad .env
node --env-file=.env index.js
```
Set `JWT_SECRET` to a random secret of at least 32 bytes and configure `DEMO_EMAIL` and `DEMO_PASSWORD`. Do **not** commit `.env`.

## Run the app (terminal 2)
```powershell
npm install
npm run dev
```
Open the address printed by Vite (usually `http://localhost:5173`). On a physical Android device, `localhost` refers to the **phone**, not your PC. Set `VITE_API_URL` to a reachable LAN HTTPS/HTTP endpoint as appropriate, rebuild and synchronize the Android project; ensure network security/CORS settings match your environment.

## Verification
```powershell
npm run build
npm run test.unit -- --run
```
For native Android, run `npm run build`, `npx cap sync android`, then `npx cap open android` and install from Android Studio. Test the permission prompt on a **real device**. Android tooling is required.

## Evidence checklist (capture actual results)
Place your own screenshots under `evidence/`:
- `01-login.png` — login screen
- `02-students.png` — authenticated student list
- `03-attendance.png` — protected attendance results
- `04-camera-permission.png` — native camera permission prompt
- `05-camera-photo.png` — captured photo preview
- `06-error-offline.png` — connection failure with a clear message
- `07-tests.png` — passing tests

**Verification status:** the source code has been assembled from the previous weeks. Screenshots and native-device tests are not fabricated. Confirm build, tests and full API workflow locally before submission.

## Scope / limitations
The backend uses fictional demo records and one configured teacher account. The camera image is local preview only. The week 11 UX preview states are simulations. This is a functional classroom MVP, not a production attendance or biometric verification system.
