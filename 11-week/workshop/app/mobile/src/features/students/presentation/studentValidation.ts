
export type StudentFormValues = {
  name: string;
  documentNumber: string;
};

export type StudentFormErrors = {
  name?: string;
  documentNumber?: string;
};

export function validateStudent(
  values: StudentFormValues
): StudentFormErrors {
  const errors: StudentFormErrors = {};
  const name = values.name.trim();
  const documentNumber = values.documentNumber.trim();

  if (!name) {
    errors.name = "El nombre es obligatorio.";
  } else if (name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres.";
  } else if (name.length > 80) {
    errors.name = "El nombre no puede superar 80 caracteres.";
  }

  if (!documentNumber) {
    errors.documentNumber = "El documento es obligatorio.";
  } else if (!/^[0-9]+$/.test(documentNumber)) {
    errors.documentNumber = "El documento solo debe contener números.";
  } else if (documentNumber.length < 5 || documentNumber.length > 15) {
    errors.documentNumber = "El documento debe tener entre 5 y 15 dígitos.";
  }

  return errors;
}

export function isStudentFormValid(
  values: StudentFormValues
): boolean {
  return Object.keys(validateStudent(values)).length === 0;
}
