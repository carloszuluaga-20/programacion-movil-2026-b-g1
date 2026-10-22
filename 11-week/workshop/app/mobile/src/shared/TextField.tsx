
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";
import { theme } from "../core/theme/theme";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export function TextField({
  label,
  error,
  style,
  ...inputProps
}: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...inputProps}
        accessibilityLabel={label}
        accessibilityHint={error || undefined}
        placeholderTextColor={theme.color.textMuted}
        style={[
          styles.input,
          error ? styles.inputError : undefined,
          style,
        ]}
      />

      {error ? (
        <Text
          style={styles.error}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.space.md,
  },
  label: {
    ...theme.text.caption,
    color: theme.color.textMuted,
    marginBottom: theme.space.xs,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: theme.color.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.space.md,
    ...theme.text.body,
    color: theme.color.text,
    backgroundColor: theme.color.surface,
  },
  inputError: {
    borderColor: theme.color.error,
    borderWidth: 2,
  },
  error: {
    ...theme.text.caption,
    color: theme.color.error,
    marginTop: theme.space.xs,
  },
});
