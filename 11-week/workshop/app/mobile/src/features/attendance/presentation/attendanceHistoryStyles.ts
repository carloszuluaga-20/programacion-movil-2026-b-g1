
import { StyleSheet } from "react-native";
import { theme } from "../../../core/theme/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  header: {
    width: "100%",
    alignSelf: "center",
    padding: theme.space.lg,
    backgroundColor: theme.color.surface,
    gap: theme.space.sm,
  },
  headerContent: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    gap: theme.space.sm,
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
  subtitle: {
    ...theme.text.caption,
    color: theme.color.textMuted,
  },
  list: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    padding: theme.space.md,
    flexGrow: 1,
  },
  card: {
    backgroundColor: theme.color.surface,
    padding: theme.space.md,
    borderRadius: theme.radius.md,
    marginBottom: theme.space.md,
  },
  date: {
    fontSize: 17,
    fontWeight: "700",
    color: theme.color.text,
    marginBottom: theme.space.sm,
  },
  body: {
    ...theme.text.body,
    color: theme.color.text,
    marginBottom: theme.space.xs,
  },
  center: {
    flex: 1,
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space.lg,
  },
  message: {
    ...theme.text.body,
    color: theme.color.textMuted,
    textAlign: "center",
    marginBottom: theme.space.md,
  },
  button: {
    backgroundColor: theme.color.primary,
    minHeight: 48,
    paddingHorizontal: theme.space.lg,
    justifyContent: "center",
    borderRadius: theme.radius.md,
  },
  buttonText: {
    color: theme.color.onPrimary,
    fontWeight: "700",
  },
});
