
import { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Button } from "../../../shared/Button";
import { TextField } from "../../../shared/TextField";
import { theme } from "../../../core/theme/theme";
import { useStudentForm } from "./useStudentForm";
import { strings } from "./strings";
import { validateStudent, isStudentFormValid } from "./studentValidation";

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export function AddStudentModal({ visible, onClose, onCreated }: Props) {
  const [name, setName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [touched, setTouched] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { state, submit, reset, clearError } = useStudentForm(() => {
    setShowSuccess(true);
    onCreated();
    handleClose();
  });

  function handleClose() {
    setName("");
    setDocumentNumber("");
    setTouched(false);
    reset();
    onClose();
  }

  function confirmCancel() {
    if (!name.trim() && !documentNumber.trim()) {
      handleClose();
      return;
    }

    Alert.alert("Descartar cambios", "¿Quieres salir sin guardar los datos?", [
      { text: "Continuar editando", style: "cancel" },
      { text: "Descartar", style: "destructive", onPress: handleClose },
    ]);
  }

  function updateName(value: string) {
    setName(value);
    clearError();
  }

  function updateDocument(value: string) {
    setDocumentNumber(value);
    clearError();
  }

  const errors = validateStudent({ name, documentNumber });
  const isSubmitting = state.status === "submitting";
  const canSave = isStudentFormValid({ name, documentNumber }) && !isSubmitting;

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent onRequestClose={confirmCancel}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.title}>Agregar estudiante</Text>

            <TextField
              label={strings.modal.nameLabel}
              value={name}
              onChangeText={updateName}
              onBlur={() => setTouched(true)}
              error={touched ? errors.name : undefined}
              editable={!isSubmitting}
            />

            <TextField
              label={strings.modal.documentLabel}
              value={documentNumber}
              onChangeText={updateDocument}
              onBlur={() => setTouched(true)}
              keyboardType="numeric"
              error={touched ? errors.documentNumber : undefined}
              editable={!isSubmitting}
            />

            {state.status === "error" && (
              <Text style={styles.error} accessibilityRole="alert">
                {state.errorMessage}
              </Text>
            )}

            <Button
              label={strings.modal.saveButton}
              onPress={() => submit(name.trim(), documentNumber.trim())}
              disabled={!canSave}
              loading={isSubmitting}
            />

            <Button
              label="Cancelar"
              onPress={confirmCancel}
              variant="text"
              disabled={isSubmitting}
            />
          </View>
        </View>
      </Modal>

      {showSuccess && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Estudiante registrado correctamente.</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cerrar notificación"
            onPress={() => setShowSuccess(false)}
          >
            <Text style={styles.toastText}>Cerrar</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: theme.color.surface,
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    padding: theme.space.lg,
    gap: theme.space.sm,
  },
  title: { ...theme.text.title, color: theme.color.text },
  error: {
    color: theme.color.error,
    ...theme.text.caption,
    marginBottom: theme.space.sm,
  },
  toast: {
    position: "absolute",
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: theme.color.success,
    padding: theme.space.md,
    borderRadius: theme.radius.md,
  },
  toastText: { color: theme.color.onPrimary, fontWeight: "600" },
});
