
import { useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button } from "../../../shared/Button";
import { theme } from "../../../core/theme/theme";
import type { RootStackParamList } from "../../../core/navigation/types";
import { useAuth } from "../../auth/presentation/AuthContext";
import { useConnectivity } from "../../../core/network/useConnectivity";
import { useStudentList } from "./useStudentList";
import { AddStudentModal } from "./AddStudentModal";
import { strings } from "./strings";
import type { Student } from "../domain/Student";

type StudentNavigation = NativeStackNavigationProp<RootStackParamList>;

export function StudentListScreen() {
  const { logout } = useAuth();
  const { state, reload } = useStudentList();
  const isConnected = useConnectivity();
  const [modalVisible, setModalVisible] = useState(false);

  const showOfflineBanner = state.isOffline || !isConnected;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{strings.screenTitle}</Text>

        <View style={styles.headerActions}>
          <Pressable
            accessible
            accessibilityRole="button"
            accessibilityLabel="Agregar estudiante"
            accessibilityHint="Abre el formulario para registrar un estudiante"
            onPress={() => setModalVisible(true)}
            disabled={showOfflineBanner}
            style={[
              styles.addButton,
              showOfflineBanner && styles.iconButtonDisabled,
            ]}
          >
            <Text style={styles.addButtonLabel}>
              + Agregar estudiante
            </Text>
          </Pressable>

          <Pressable
            accessible
            accessibilityRole="button"
            accessibilityLabel={strings.logoutButtonA11y}
            onPress={logout}
            hitSlop={8}
            style={styles.iconButton}
          >
            <Text style={styles.iconButtonLabel}>Salir</Text>
          </Pressable>
        </View>
      </View>

      {showOfflineBanner && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            {strings.offlineBanner}
          </Text>
        </View>
      )}

      {state.status === "loading" && <SkeletonList />}

      {state.status === "empty" && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            {strings.emptyMessage}
          </Text>
          <Button
            label={strings.addStudentCta}
            onPress={() => setModalVisible(true)}
            disabled={showOfflineBanner}
          />
        </View>
      )}

      {state.status === "error" && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            {strings.errorMessage}
          </Text>
          <Button label={strings.retryButton} onPress={reload} />
        </View>
      )}

      {state.status === "loaded" && (
        <FlatList
          data={state.students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StudentCard student={item} />}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={reload}
            />
          }
        />
      )}

      <AddStudentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreated={reload}
      />
    </View>
  );
}

function StudentCard({ student }: { student: Student }) {
  const navigation = useNavigation<StudentNavigation>();

  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${student.name}`}
      accessibilityHint="Abre la información del estudiante"
      onPress={() =>
        navigation.navigate("StudentDetail", {
          studentId: student.id,
        })
      }
      style={styles.card}
    >
      <Text style={styles.cardText}>{student.name}</Text>
      <Text style={styles.cardHint}>Ver detalle</Text>
    </Pressable>
  );
}

function SkeletonList() {
  return (
    <View style={{ padding: theme.space.md }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.skeletonRow} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.space.md,
    gap: theme.space.sm,
    flexWrap: "wrap",
  },
  title: {
    ...theme.text.title,
    color: theme.color.text,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space.sm,
    flexWrap: "wrap",
  },
  addButton: {
    minHeight: 48,
    paddingHorizontal: theme.space.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color.primary,
    borderRadius: theme.radius.md,
  },
  addButtonLabel: {
    color: theme.color.onPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  iconButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.pill,
  },
  iconButtonDisabled: {
    opacity: 0.4,
  },
  iconButtonLabel: {
    fontSize: 16,
    color: theme.color.primary,
    fontWeight: "600",
  },
  banner: {
    backgroundColor: theme.color.border,
    padding: theme.space.sm,
  },
  bannerText: {
    ...theme.text.caption,
    color: theme.color.text,
    textAlign: "center",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space.md,
    padding: theme.space.lg,
  },
  emptyText: {
    ...theme.text.body,
    color: theme.color.textMuted,
    textAlign: "center",
  },
  card: {
    minHeight: 56,
    justifyContent: "center",
    padding: theme.space.md,
    marginHorizontal: theme.space.md,
    marginVertical: theme.space.xs,
    backgroundColor: theme.color.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.color.border,
  },
  cardText: {
    ...theme.text.body,
    color: theme.color.text,
    fontWeight: "600",
  },
  cardHint: {
    ...theme.text.caption,
    color: theme.color.primary,
    marginTop: theme.space.xs,
  },
  skeletonRow: {
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.color.border,
    marginBottom: theme.space.sm,
  },
});
