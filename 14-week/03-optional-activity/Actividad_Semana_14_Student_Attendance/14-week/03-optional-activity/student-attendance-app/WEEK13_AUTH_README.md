# Week 13 — Token authentication and connectivity

This is the **Student Attendance** Ionic/React/Capacitor app reused from the earlier weeks, with the existing Express JWT API.

## Requirements
- **Login:** `POST /api/auth/login` returns a signed JWT; the token is held **in memory only** (`src/services/auth.ts`), not in browser storage. Reloading the page signs the user out. This is an intentional short-lived, non-persistent approach; a production native app should use OS-backed secure storage.
- **Protected requests:** `src/services/api.ts` adds `Authorization: Bearer <token>` to `/api/students` and `/api/attendance`.
- **401:** Invalid/expired token clears the session and sends the user back to login with an explanatory message.
- **Offline:** Network failures show a clear message and retry option on the protected pages. No token is cleared for a network failure.
- **Centralization:** API calls and error handling live in `src/services/api.ts`.

## Run (two terminals)
1. `cd api` then `npm install`.
2. Copy `api/.env.example` to `api/.env`. Replace the secret and password; generate a secret with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.
3. In the `api` folder run `node --env-file=.env index.js` (Node 20+).
4. In the app root run `npm install` then `npm run dev`.
5. Open the Vite URL and sign in with the values from `api/.env`.

## Evidence checklist
- Successful login and student list (protected API)
- Browser Network panel: `Authorization: Bearer ...` header (hide the token in screenshots)
- Unauthorized: use DevTools to block/modify token or restart API with a different JWT_SECRET, then request students
- Offline: stop API, reload students, verify clear error and Retry button; restart API and retry

**Note:** The UI demo shortcut from Week 11 is removed from login for this authentication-focused activity. Week 13 requires a real JWT from the API.
