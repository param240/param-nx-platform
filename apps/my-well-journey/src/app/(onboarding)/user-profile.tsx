import { useUser } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

// ─── Types ────────────────────────────────────────────────────────────────────

type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

const GENDER_OPTIONS: { key: Gender; label: string }[] = [
  { key: 'male',              label: 'Male' },
  { key: 'female',            label: 'Female' },
  { key: 'non_binary',        label: 'Non-binary' },
  { key: 'prefer_not_to_say', label: 'Prefer not to say' },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function UserProfileScreen() {
  const { user } = useUser();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  // Pre-fill from Clerk if already set (e.g. OAuth sign-up)
  const [firstName, setFirstName] = useState(user?.firstName ?? '');
  const [lastName,  setLastName]  = useState(user?.lastName  ?? '');
  const [dob,       setDob]       = useState('');
  const [gender,    setGender]    = useState<Gender | null>(null);
  const [phone,     setPhone]     = useState('');

  const [saving,   setSaving]   = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const canContinue = firstName.trim() && lastName.trim() && dob.trim();

  async function handleContinue() {
    if (!canContinue || !user) return;
    setErrorMsg('');
    setSaving(true);
    try {
      await user.update({
        firstName: firstName.trim(),
        lastName:  lastName.trim(),
        unsafeMetadata: {
          ...user.unsafeMetadata,
          profileSetupDone: true,
          dateOfBirth: dob.trim(),
          gender: gender ?? '',
          phone: phone.trim(),
        },
      });
      router.replace('/(onboarding)/condition-select');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setSaving(false);
    }
  }

  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      backgroundColor: colors.backgroundElement,
      borderColor: colors.backgroundSelected,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View style={styles.maxWidth}>

              {/* Header */}
              <ThemedView style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                  Your profile
                </ThemedText>
                <ThemedText themeColor="textSecondary" style={styles.subtitle}>
                  Help us personalise your experience.
                </ThemedText>
              </ThemedView>

              {/* Form */}
              <View style={styles.form}>

                {/* First name */}
                <View style={styles.fieldGroup}>
                  <ThemedText type="small" style={styles.label}>First name *</ThemedText>
                  <TextInput
                    style={inputStyle}
                    placeholder="First name"
                    placeholderTextColor={colors.textSecondary}
                    value={firstName}
                    onChangeText={setFirstName}
                    autoCapitalize="words"
                    autoComplete="given-name"
                    textContentType="givenName"
                    returnKeyType="next"
                  />
                </View>

                {/* Last name */}
                <View style={styles.fieldGroup}>
                  <ThemedText type="small" style={styles.label}>Last name *</ThemedText>
                  <TextInput
                    style={inputStyle}
                    placeholder="Last name"
                    placeholderTextColor={colors.textSecondary}
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize="words"
                    autoComplete="family-name"
                    textContentType="familyName"
                    returnKeyType="next"
                  />
                </View>

                {/* Date of birth */}
                <View style={styles.fieldGroup}>
                  <ThemedText type="small" style={styles.label}>Date of birth *</ThemedText>
                  <TextInput
                    style={inputStyle}
                    placeholder="DD / MM / YYYY"
                    placeholderTextColor={colors.textSecondary}
                    value={dob}
                    onChangeText={setDob}
                    keyboardType="numeric"
                    returnKeyType="next"
                  />
                </View>

                {/* Gender */}
                <View style={styles.fieldGroup}>
                  <ThemedText type="small" style={styles.label}>
                    Gender <ThemedText type="small" themeColor="textSecondary">(optional)</ThemedText>
                  </ThemedText>
                  <View style={styles.chipRow}>
                    {GENDER_OPTIONS.map((opt) => {
                      const selected = gender === opt.key;
                      return (
                        <Pressable
                          key={opt.key}
                          onPress={() => setGender(selected ? null : opt.key)}
                          style={({ pressed }) => [pressed && styles.chipPressed]}>
                          <ThemedView
                            type={selected ? 'backgroundSelected' : 'backgroundElement'}
                            style={styles.chip}>
                            <ThemedText
                              type="small"
                              themeColor={selected ? 'text' : 'textSecondary'}>
                              {opt.label}
                            </ThemedText>
                          </ThemedView>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                {/* Phone */}
                <View style={styles.fieldGroup}>
                  <ThemedText type="small" style={styles.label}>
                    Phone <ThemedText type="small" themeColor="textSecondary">(optional)</ThemedText>
                  </ThemedText>
                  <TextInput
                    style={inputStyle}
                    placeholder="+1 (555) 000-0000"
                    placeholderTextColor={colors.textSecondary}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                    textContentType="telephoneNumber"
                    returnKeyType="done"
                  />
                </View>

              </View>

              {/* Error */}
              {errorMsg ? (
                <ThemedText style={styles.error}>{errorMsg}</ThemedText>
              ) : null}

              {/* Continue */}
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  !canContinue && styles.buttonDisabled,
                  pressed && !!canContinue && styles.buttonPressed,
                ]}
                onPress={handleContinue}
                disabled={!canContinue || saving}>
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText style={styles.buttonText}>Continue</ThemedText>
                )}
              </Pressable>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container:   { flex: 1 },
  safeArea:    { flex: 1, alignItems: 'center' },
  keyboardView:{ flex: 1, alignSelf: 'stretch' },
  scroll: {
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
  // Header
  header:   { alignItems: 'center', gap: Spacing.two },
  title:    { textAlign: 'center' },
  subtitle: { textAlign: 'center', fontSize: 15 },
  // Form
  form: { gap: Spacing.three },
  fieldGroup: { gap: Spacing.one },
  label: { fontWeight: '500' },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  // Gender chips
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
  },
  chipPressed: { opacity: 0.75 },
  // Error
  error: { color: '#ef4444', fontSize: 13, textAlign: 'center' },
  // Button
  button: {
    height: 52,
    borderRadius: Spacing.two,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonPressed:  { opacity: 0.8 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
