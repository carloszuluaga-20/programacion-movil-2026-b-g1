
import { useCallback, useEffect, useState } from "react";
import { container } from "../../../core/di/container";
import type { Student } from "../domain/Student";

type StudentListState = {
  status: "loading" | "loaded" | "empty" | "error";
  students: Student[];
  isOffline: boolean;
};

const demoMode = process.env.EXPO_PUBLIC_DEMO_MODE === "true";

const demoStudents: Student[] = [
  {
    id: "student-001",
    name: "Estudiante de prueba 1",
    documentNumber: "1000000001",
  },
  {
    id: "student-002",
    name: "Estudiante de prueba 2",
    documentNumber: "1000000002",
  },
  {
    id: "student-003",
    name: "Estudiante de prueba 3",
    documentNumber: "1000000003",
  },
];

export function useStudentList() {
  const [state, setState] = useState<StudentListState>({
    status: "loading",
    students: [],
    isOffline: false,
  });

  const load = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      status: "loading",
    }));

    if (demoMode) {
      setState({
        status: "loaded",
        students: demoStudents,
        isOffline: false,
      });
      return;
    }

    try {
      const { students, fromCache } =
        await container.students.getStudents.execute();

      setState({
        status: students.length === 0 ? "empty" : "loaded",
        students,
        isOffline: fromCache,
      });
    } catch {
      setState((prev) => ({
        ...prev,
        status: "error",
      }));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { state, reload: load };
}
