# Week 11 — UX redesign of Attendance History

## Source and scope
This project is copied from the original `14-week/03-optional-activity/student-attendance-app` Ionic React + Capacitor application. The original remains unchanged. Week 11 modifies the existing Attendance History screen and adds a clearly labeled preview login for offline review.

## Before / After
| Before | After |
|---|---|
| Heading and list without a primary action | One prominent **Refresh attendance** action |
| Existing back navigation | Existing stack navigation preserved: Home → Attendance → Back |
| Loading, error and empty handled only via API | Loading/data/empty/error preserved, with explicit data/empty/error preview |
| Basic controls | Minimum 48px touch controls, stronger text hierarchy and visible status messaging |

## Run
From this folder: `npm install`, then `npm run dev`. Open the Vite URL (usually http://localhost:5173). **Do not use Expo:** this is Ionic + Vite. For the real API, start the included `api` server following the original README.

For a backend-free review, select **Preview Week 11 UX (no backend)** on the login page. This is a local UI preview only, not an authenticated API session. In Attendance, switch between Data / Empty / Error. The API tab uses the original protected API when signed in with real credentials.

## Evidence to capture
1. `evidence/before.png`: original Attendance screen from the week 14 source app.
2. `evidence/after-data.png`: redesigned Data state.
3. `evidence/after-empty.png`: Empty state.
4. `evidence/after-error.png`: Error state.
5. `evidence/after-loading.png`: API loading indicator (if available).

Screenshots must be captured from the running app; none are fabricated.

## Rubric mapping
- 40 points: clear primary action and existing stack-style routing.
- 40 points: loading, data, empty and error states.
- 20 points: accessible touch targets and before/after documentation.
