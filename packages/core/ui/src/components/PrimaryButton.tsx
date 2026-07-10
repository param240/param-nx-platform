import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface PrimaryButtonProps extends Omit<PressableProps, 'style'> {
  /** Text shown inside the button. */
  title: string;
  /** Shows a spinner and disables presses while true. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A styled React Native button built on Pressable — a shared, cross-platform
 * counterpart to the native `Button` re-exported from @expo/ui.
 */
export function PrimaryButton({
  title,
  loading = false,
  disabled,
  style,
  ...rest
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={styles.label}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#208AEF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
