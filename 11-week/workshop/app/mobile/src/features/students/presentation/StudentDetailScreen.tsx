
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { theme } from "../../../core/theme/theme";
import type { RootStackParamList } from "../../../core/navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "StudentDetail"
>;

export function StudentDetailScreen({ route, navigation }: Props) {
  const { studentId } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <Pressable
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Volver a la lista de estudiantes"
          accessibilityHint="Regresa a la pantalla anterior"
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Volver</Text>
        </Pressable>

        <Text
          style={styles.title}
          accessibilityRole="header"
        >
          Detalle de estudiante
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>
            Identificador del estudiante
          </Text>

          <Text
            style={styles.value}
            selectable
          >
            {studentId}
          </Text>

          <Text style={styles.notice}>
            La información completa estará disponible cuando
            se conecte la consulta del estudiante.
          </Text>
        </View>

        <Pressable
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel="Ver historial de asistencia"
          accessibilityHint="Abre el historial del estudiante seleccionado"
          onPress={() =>
            navigation.navigate("AttendanceHistory", { studentId })
          }
        >
          <Text style={styles.buttonText}>
            Ver historial de asistencia
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.space.lg,
  },
  content: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    gap: theme.space.md,
  },
  backButton: {
    minHeight: 48,
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  backText: {
    color: theme.color.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    ...theme.text.title,
    color: theme.color.text,
  },
  card: {
    backgroundColor: theme.color.surface,
    padding: theme.space.lg,
    borderRadius: theme.radius.md,
    gap: theme.space.sm,
  },
  label: {
    ...theme.text.caption,
    color: theme.color.textMuted,
  },
  value: {
    ...theme.text.body,
    color: theme.color.text,
    fontWeight: "700",
  },
  notice: {
    ...theme.text.caption,
    color: theme.color.textMuted,
    marginTop: theme.space.sm,
  },
  button: {
    backgroundColor: theme.color.primary,
    minHeight: 48,
    padding: theme.space.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.color.onPrimary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
