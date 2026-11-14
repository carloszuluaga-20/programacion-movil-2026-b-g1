# Week 12 — Capacitor Camera Integration

## Base project
This is the original Student Attendance Ionic + React + Capacitor app from week 14, copied into `12-week/03-optional-activity/`. The existing login, students, attendance, API and camera navigation are preserved.

## Implementation
- `@capacitor/camera` is already installed and used by `src/pages/CameraEvidence.tsx`.
- The Camera Evidence screen requests native camera permission on demand, handles denied permission, takes a picture, displays it and allows removal.
- Permission status, loading, success, cancellation and error feedback are displayed.
- The photo preview is local to the app; it is not uploaded to the API.

## Run in browser (quick functional check)
```bash
npm install
npm run dev
```
Browser tests are useful for UI checks, but do not replace the required real-device test. The camera may be unavailable on some desktop browsers.

## Android real-device test (required)
Install Android Studio and connect an Android phone with USB debugging enabled. From the app directory:
```bash
npm install
npm run build
npx cap sync android
npx cap open android
```
Build and run on the phone from Android Studio. Sign in using your running API, navigate to **Camera Evidence**, tap **Take Photo**, allow camera access, capture a photo, verify its preview and remove it.

For the denied-permission scenario, deny the camera permission when prompted. If it was previously granted, revoke it in Android Settings > Apps > Student Attendance > Permissions > Camera, then retry. Verify the error message and permission status. On some Android versions, repeated denial requires changing permissions in Settings.

## Evidence to add before submission
Place your **real screenshots** in `evidence/`:
- `01-camera-permission-request.png` — Android camera permission dialog
- `02-photo-captured.png` — captured image preview
- `03-permission-denied.png` — denied permission and feedback
- `04-device-test.png` — app running on the physical Android device

Do not use simulated screenshots as evidence of a physical-device test.

## Evaluation checklist
- [x] Camera plugin integrated into existing app
- [x] Permission request and denied-permission handling implemented
- [x] Capture, preview and remove photo UI implemented
- [ ] Build and run verified on a physical Android device
- [ ] Real screenshots attached
