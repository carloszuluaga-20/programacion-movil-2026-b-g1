import { describe, expect, it } from 'vitest';
import { filterStudents } from './studentFilters';
import type { Student } from '../services/api';

const students: Student[] = [
  { id: 1, name: 'Ana Pérez', email: 'ana@example.com', program: 'Engineering' },
  { id: 2, name: 'Luis Gómez', email: 'luis@example.com', program: 'Medicine' },
];

describe('filterStudents', () => {
  it('matches names regardless of case and surrounding spaces', () => {
    expect(filterStudents(students, '  ANA ')).toEqual([students[0]]);
  });

  it('matches email/program and returns empty when nothing matches', () => {
    expect(filterStudents(students, 'medicine')).toEqual([students[1]]);
    expect(filterStudents(students, 'nobody')).toEqual([]);
  });
});
