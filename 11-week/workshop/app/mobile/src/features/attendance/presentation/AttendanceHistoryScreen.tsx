
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { theme } from "../../../core/theme/theme";
import type { RootStackParamList } from "../../../core/navigation/types";
import { styles } from "./attendanceHistoryStyles";

type Session = {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  muscleGroups: string[];
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "AttendanceHistory"
>;

export function AttendanceHistoryScreen({
  route,
  navigation,
}: Props) {
  const { studentId } = route.params;

  const [sessions] = useState<Session[]>([]);
  const [loading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const reload = useCallback(async () => {
    setError(null);
    setRefreshing(true);

    // La conexión con el historial real está pendiente.
    setRefreshing(false);
  }, []);

  const renderSession = ({ item }: { item: Session }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.body}>Entrada: {item.checkIn}</Text>
      <Text style={styles.body}>Salida: {item.checkOut}</Text>
      <Text style={styles.body}>
        Grupos musculares: {item.muscleGroups.join(", ")}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Volver al detalle del estudiante"
          style={styles.backButton}
        >
          <Text style={styles.backText}>Volver</Text>
        </Pressable>

        <Text style={styles.title}>Historial de asistencia</Text>
        <Text style={styles.subtitle}>
          Estudiante: {studentId}
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={theme.color.primary}
          />
          <Text style={styles.message}>
            Cargando historial...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.message}>{error}</Text>
          <Pressable
            style={styles.button}
            onPress={reload}
            accessibilityRole="button"
            accessibilityLabel="Reintentar cargar historial"
          >
            <Text style={styles.buttonText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          renderItem={renderSession}
          contentContainerStyle={styles.list}
          refreshing={refreshing}
          onRefresh={reload}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.message}>
                Todavía no hay sesiones registradas
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
