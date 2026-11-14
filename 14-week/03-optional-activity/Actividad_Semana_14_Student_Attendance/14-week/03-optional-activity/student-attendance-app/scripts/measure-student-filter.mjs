// Reproducible comparison of filtering work across unrelated renders.
// This measures filter invocations (not wall-clock time or React FPS).
const students = Array.from({ length: 1000 }, (_, id) => ({ id, name: `Student ${id}`, email: `s${id}@example.com`, program: 'Engineering' }));
const unrelatedRenders = 100;
let beforeCalls = 0;
let afterCalls = 0;
const filter = (query) => students.filter(s => s.name.toLowerCase().includes(query));
for (let i = 0; i < unrelatedRenders; i++) { beforeCalls++; filter('student 2'); }
// Equivalent to useMemo with stable students and query: one initial computation.
afterCalls++; filter('student 2');
console.log(JSON.stringify({ students: students.length, unrelatedRenders, beforeFilterCalls: beforeCalls, afterFilterCalls: afterCalls, reductionPercent: (1 - afterCalls / beforeCalls) * 100 }, null, 2));
