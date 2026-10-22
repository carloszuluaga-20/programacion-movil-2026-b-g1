
import { useCallback, useState } from "react";
import { container } from "../../../core/di/container";
import { strings } from "./strings";

type StudentFormState = {
  status: "idle" | "submitting" | "success" | "error";
  errorMessage?: string;
};

export function useStudentForm(onSuccess: () => void) {
  const [state, setState] = useState<StudentFormState>({
    status: "idle",
  });

  const submit = useCallback(
    async (name: string, documentNumber: string) => {
      setState({ status: "submitting" });

      try {
        await container.students.createStudent.execute(
          name,
          documentNumber
        );

        setState({ status: "success" });
        onSuccess();
      } catch {
        setState({
          status: "error",
          errorMessage: strings.modal.genericError,
        });
      }
    },
    [onSuccess]
  );

  const reset = useCallback(() => {
    setState({ status: "idle" });
  }, []);

  const clearError = useCallback(() => {
    setState((current) =>
      current.status === "error"
        ? { status: "idle" }
        : current
    );
  }, []);

  return { state, submit, reset, clearError };
}
