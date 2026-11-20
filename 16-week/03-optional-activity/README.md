# Week 16 — Student Attendance | Deployment and Portfolio

**Course:** Programación Móvil · 2026-B · Corte 3  
**Application:** Student Attendance  
**Delivery:** Optional activity — Week 16  
**Student:** Complete with your name and GitHub username before submission

## 1. Application overview

Student Attendance is a classroom mobile MVP designed to help a teacher consult students and attendance records and capture optional photographic evidence. The application includes teacher login, JWT-protected requests, a student search, attendance history, explicit loading/empty/error states, camera permission handling, and sign-out.

**Important scope:** The API uses fictional demonstration records and a configured teacher account. The photo is previewed locally; it is not uploaded or stored. The Week 11 selector simulates UI states, not real attendance records. This is not a production-ready attendance system.

### Technologies

| Layer | Technologies |
| --- | --- |
| Mobile UI | Ionic React 9, React 19, TypeScript, React Router |
| Native bridge | Capacitor 8, Android, Capacitor Camera |
| Build | Vite 8, TypeScript |
| API and authentication | Express, JWT |
| Tests | Vitest, Cypress configuration |

**Source application:** [Week 15 Student Attendance](../../15-week/03-optional-activity/Actividad_Semana_15_Student_Attendance/15-week/03-optional-activity/student-attendance-app/)  
**Previous documentation:** [Week 15 MVP README](../../15-week/03-optional-activity/Actividad_Semana_15_Student_Attendance/15-week/03-optional-activity/student-attendance-app/WEEK15_MVP_README.md)

## 2. Build and deployment process (40 points)

### Prerequisites

Node.js and npm compatible with the lockfile, Android Studio, Android SDK, a configured JDK, and (for physical device testing) a USB-connected Android device or emulator. Start in the app directory above.

### A. Web production build

```powershell
cd 15-week/03-optional-activity/Actividad_Semana_15_Student_Attendance/15-week/03-optional-activity/student-attendance-app
npm ci
npm run build
```

The `build` script executes `tsc && vite build`; output should be in `dist/`. **This README does not assert the build was run successfully**; capture the real terminal output in `evidence/01-build.png`.

### B. Sync and Android build

```powershell
npx cap sync android
npx cap open android
```

In Android Studio: wait for Gradle sync, select an emulator/device, run the app, then use **Build > Generate Signed Bundle / APK** for a signed Android App Bundle (AAB). For a local debug APK, use the Android build menu. Signing requires a keystore, which must remain private and outside Git.

For a CLI debug build on Windows (with the Android toolchain configured):

```powershell
cd android
.\gradlew.bat assembleDebug
```

Expected debug artifact: `android/app/build/outputs/apk/debug/app-debug.apk`. Do not commit generated builds unless explicitly requested. A Play Store release requires a **signed AAB**, not just this debug APK.

### C. Store publication checklist

1. Replace the starter `appId` (`io.ionic.starter`) with a unique reverse-domain application ID **before** releasing. Align Android `applicationId`, package naming and signing configuration carefully; changing an already published ID creates a different app.
2. Replace the default launcher icon and adaptive icon assets; prepare store icon and screenshots using actual app screens.
3. Check the Android manifest and Capacitor Camera behavior. `INTERNET` is currently declared; camera access and permissions must be tested on a real Android device, including denial and retry. Declare only permissions actually required by the final implementation.
4. Configure a reachable API URL for the Android device (not `localhost` on the PC), use HTTPS in production, set CORS/network settings correctly, and keep JWT secrets and credentials outside source control.
5. Prepare store listing: app title, short/full descriptions, category, contact email, privacy policy, data safety declaration, target audience, and actual screenshots.
6. Generate a signed AAB, test the release variant, upload it to Play Console, complete policy questionnaires and release it through a test track before production.

**Publication status:** documented only. No Play Store publication is claimed.

## 3. Final feedback and UX review (25 points)

| Area | Existing behavior or source evidence | Final verification |
| --- | --- | --- |
| Authentication | In-memory JWT and sign-out documented in Week 15 | Verify valid/invalid login and expired token |
| Error handling | Loading, empty, HTTP/network error states documented | Verify offline and 401 in the running app |
| Camera UX | Permission denial handling and local preview documented | Test on physical Android hardware |
| Student search | Memoized filtering and unit-test files present | Run tests and capture results |
| README | Week 15 MVP instructions available | This Week 16 README adds deployment and portfolio |

**No code changes or successful tests are claimed in this package.** If final teacher feedback requires a specific correction, implement it in the source app and record the change and screenshot here. The original ZIP did not supply a separate list of teacher feedback.

## 4. Portfolio entry (35 points)

### What the app does

A teacher logs in to the demonstration API, browses the student list, checks attendance records, and optionally captures a camera photo for local preview. Protected requests use a JWT. The interface communicates loading, empty and failure states and lets the teacher sign out.

### Screenshots

Add genuine screenshots to `evidence/` and replace the checklist below with embedded Markdown images after capturing them:

| Evidence | Filename | What to show |
| --- | --- | --- |
| Production build | `01-build.png` | Successful `npm run build` output |
| Android build | `02-android-build.png` | Android Studio build or APK/AAB output |
| Login | `03-login.png` | Actual login screen |
| Student list | `04-students.png` | Authenticated student list |
| Attendance | `05-attendance.png` | Attendance screen |
| Camera | `06-camera.png` | Permission or photo preview on device |
| UX handling | `07-errors.png` | Offline or 401 handling |
| Tests | `08-tests.png` | Real test execution output |

Do not present mockups or source assets as proof of runtime execution.

### What I learned

During the development of Student Attendance I learned how a web application can become a mobile experience using Ionic React and Capacitor. I practiced organizing reusable components, navigating between screens and communicating with an API. Working with authentication helped me understand how to protect requests with JWT and why sessions must be cleared after an unauthorized response. I also learned that a mobile application must explain what is happening when data is loading, there are no records or the network fails.

Integrating the camera showed me that native hardware needs permission handling and device testing, not just a web preview. I also understood the difference between a development build, a distributable Android package and an actual store release. My next step is to validate the app on a physical Android device, strengthen automated tests, replace the demo backend with a production-ready service and prepare a properly signed release with a privacy policy.

## 5. Submission verification

- [x] Application overview and technology stack
- [x] Deployment steps, icons, permissions and store listing documented
- [x] Final UX review and known limitations documented
- [x] Portfolio reflection and screenshot checklist
- [ ] Run and verify the production build
- [ ] Generate and verify an Android build
- [ ] Add real screenshots to `evidence/`
- [ ] Apply any outstanding teacher feedback to source code
- [ ] Confirm personal name, GitHub links and profile `CONFIG` (`FULL_NAME`, `GITHUB_USER`)
- [ ] Commit and push to personal fork

**Source:** Week 15 Student Attendance implementation in this repository. This Week 16 delivery adds documentation and a reproducible verification guide; it does not duplicate or silently alter the original app.
