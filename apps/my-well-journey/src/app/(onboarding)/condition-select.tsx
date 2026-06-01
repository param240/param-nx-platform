import { useUser } from '@clerk/expo';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

// ─── Condition data ───────────────────────────────────────────────────────────

type ConditionKey = 'oncology' | 'diabetes' | 'obesity_glp1';

const CONDITIONS: {
  key: ConditionKey;
  color: string;
  icon: string;
  label: string;
  tagline: string;
}[] = [
  {
    key: 'oncology',
    color: '#E24B4A',
    icon: '🧬',
    label: 'Cancer Care Companion',
    tagline: 'Chemo tracking, side effects & oncology support',
  },
  {
    key: 'diabetes',
    color: '#EF9F27',
    icon: '💉',
    label: 'Diabetes Care Manager',
    tagline: 'Glucose logs, insulin tracking & meal planning',
  },
  {
    key: 'obesity_glp1',
    color: '#378ADD',
    icon: '⚖️',
    label: 'Weight Care Program',
    tagline: 'GLP-1 therapy, weight tracking & injection logs',
  },
];

// ─── ConditionCard ────────────────────────────────────────────────────────────

function ConditionCard({
  condition,
  selected,
  onSelect,
}: {
  condition: (typeof CONDITIONS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Pressable
      onPress={onSelect}
      style={({ pressed }) => [pressed && styles.cardPressed]}>
      <ThemedView
        type="backgroundElement"
        style={[styles.card, selected && { borderColor: condition.color, borderWidth: 2 }]}>
        {/* Colored accent stripe */}
        <View style={[styles.accentStripe, { backgroundColor: condition.color }]} />

        <View style={styles.cardContent}>
          <ThemedText style={styles.cardIcon}>{condition.icon}</ThemedText>
          <View style={styles.cardText}>
            <ThemedText type="subtitle" style={styles.cardLabel}>
              {condition.label}
            </ThemedText>
            <ThemedText themeColor="textSecondary" type="small">
              {condition.tagline}
            </ThemedText>
          </View>
          {selected && (
            <View style={[styles.checkmark, { backgroundColor: condition.color }]}>
              <ThemedText style={styles.checkmarkText}>✓</ThemedText>
            </View>
          )}
        </View>
      </ThemedView>
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ConditionSelectScreen() {
  const { user } = useUser();
  const [selected, setSelected] = useState<ConditionKey | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleContinue() {
    if (!selected || !user) return;
    setErrorMsg('');
    setSaving(true);
    try {
      await user.update({ unsafeMetadata: { conditionKey: selected } });
      // Navigation is automatic: useUser() update propagates → (main)/_layout.tsx
      // re-renders → Redirect is no longer rendered → user lands on the main screen.
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setSaving(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.maxWidth}>
            {/* Header */}
            <ThemedView style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                Choose your program
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.subtitle}>
                This personalizes your app experience. You can change it later.
              </ThemedText>
            </ThemedView>

            {/* Condition cards */}
            <View style={styles.cards}>
              {CONDITIONS.map((condition) => (
                <ConditionCard
                  key={condition.key}
                  condition={condition}
                  selected={selected === condition.key}
                  onSelect={() => setSelected(condition.key)}
                />
              ))}
            </View>

            {errorMsg ? (
              <ThemedText style={styles.error}>{errorMsg}</ThemedText>
            ) : null}

            {/* Continue button */}
            <Pressable
              style={({ pressed }) => [
                styles.button,
                !selected && styles.buttonDisabled,
                pressed && selected && styles.buttonPressed,
              ]}
              onPress={handleContinue}
              disabled={!selected || saving}>
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Continue</ThemedText>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, alignItems: 'center' },
  scroll: {
    // Override the parent's alignItems: 'center' so ScrollView fills the full width
    alignSelf: 'stretch',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  maxWidth: { flex: 1, gap: Spacing.four },
  header: { alignItems: 'center', gap: Spacing.two },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center', fontSize: 15 },
  cards: { gap: Spacing.three },
  // Card
  card: {
    borderRadius: Spacing.three,
    overflow: 'hidden',
    flexDirection: 'row',
    // default transparent border so layout is stable when selected border appears
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardPressed: { opacity: 0.85 },
  accentStripe: {
    width: 6,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  cardIcon: {
    fontSize: 28,
    lineHeight: 34,
  },
  cardText: {
    flex: 1,
    gap: Spacing.one,
  },
  cardLabel: {
    fontSize: 16,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  // Error
  error: {
    color: '#ef4444',
    fontSize: 13,
    textAlign: 'center',
  },
  // Button
  button: {
    height: 52,
    borderRadius: Spacing.two,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
