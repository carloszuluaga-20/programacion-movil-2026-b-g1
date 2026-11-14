import type { Student } from '../services/api';

/** Case-insensitive matching with trimmed search input. */
export function filterStudents(students: Student[], query: string): Student[] {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return students;
  return students.filter((student) =>
    [student.name, student.email, student.program].some((field) =>
      field.toLocaleLowerCase().includes(normalized)
    )
  );
}
