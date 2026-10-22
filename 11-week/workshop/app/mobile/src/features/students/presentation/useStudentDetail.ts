
import { useCallback, useEffect, useState } from "react";
import { container } from "../../../core/di/container";
import type { Student } from "../domain/Student";

type DetailState =
  | { status: "loading"; student: null }
  | { status: "loaded"; student: Student }
  | { status: "not-found"; student: null }
  | { status: "error"; student: null };

const demoStudents: Student[] = [
  { id: "student-001", name: "Estudiante de prueba 1", documentNumber: "1000000001" },
  { id: "student-002", name: "Estudiante de prueba 2", documentNumber: "1000000002" },
  { id: "student-003", name: "Estudiante de prueba 3", documentNumber: "1000000003" },
];

export function useStudentDetail(studentId: string) {
  const [state, setState] = useState<DetailState>({
    status: "loading",
    student: null,
  });

  const reload = useCallback(async () => {
    setState({ status: "loading", student: null });

    try {
      const students =
        process.env.EXPO_PUBLIC_DEMO_MODE === "true"
          ? demoStudents
          : (await container.students.getStudents.execute()).students;

      const student = students.find((item) => item.id === studentId);

      setState(
        student
          ? { status: "loaded", student }
          : { status: "not-found", student: null }
      );
    } catch {
      setState({ status: "error", student: null });
    }
  }, [studentId]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { state, reload };
}
