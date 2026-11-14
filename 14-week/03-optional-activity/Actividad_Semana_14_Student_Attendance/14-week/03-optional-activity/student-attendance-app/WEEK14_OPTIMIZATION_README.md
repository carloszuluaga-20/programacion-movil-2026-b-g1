# Week 14 — Optimization and unit tests

## Source and change

This activity continues the Student Attendance Ionic + React + Capacitor application from week 13. The optimized screen is `src/pages/Students.tsx`. Login, JWT-protected requests, error states, and the centralized API service remain intact.

**Before:** filtering on each render (a common naive implementation) would re-scan all student records even if the data and search query were unchanged. **After:** `useMemo` caches the filtered result until `students` or `search` changes. A search input allows searching by name, email, or program, and displays the result count. The original screen did not have search; the comparison is between the naive filtering approach and the optimized filtering approach, not a claimed measurement of the original app's runtime.

## Reproducible before/after measurement

Run `node scripts/measure-student-filter.mjs`. The script simulates 100 unrelated UI renders over 1,000 records with an unchanged query. It counts filter invocations (not elapsed time or real device performance).

| Metric | Naive filtering | Memoized filtering |
| --- | ---: | ---: |
| Filter computations over 100 unrelated renders | 100 | 1 |
| Reduction in redundant filter computations | — | 99% |

This is a controlled model of the optimization. For real-device evidence, use React DevTools Profiler and capture before/after screenshots under `evidence/`; do not present the simulation as a measured device speedup. Data changes or query changes correctly cause filtering to run again.

## Tests

`src/utils/studentFilters.test.ts` includes **two unit tests**:

1. Case-insensitive, trimmed name search.
2. Program matching and the empty-result case.

Run `npm install`, then `npm run test.unit -- --run src/utils/studentFilters.test.ts`, and `npm run build`. Add the actual command output or screenshots to `evidence/` before submission.

## Run

1. Start the existing Express API from `api/` following `WEEK13_AUTH_README.md` (keep `.env` private).
2. From this application directory, run `npm install` and `npm run dev`.
3. Sign in, open Students, and use the search field.

## Evidence checklist

- Screenshot of student list and search results.
- Screenshot of passing two unit tests.
- Output of the before/after measurement script.
- Optional React DevTools Profiler screenshots for actual device/browser measurements.
