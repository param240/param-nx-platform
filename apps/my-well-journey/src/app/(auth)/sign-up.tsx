import { useSignUp } from '@clerk/expo';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';

export default function SignUpScreen() {
  // Clerk v3 Signals API: { signUp, errors, fetchStatus }
  const { signUp, fetchStatus } = useSignUp();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loading = fetchStatus === 'fetching';

  async function handleSignUp() {
    setErrorMsg('');

    // Step 1: create the sign-up with email + password
    const createResult = await signUp.create({ emailAddress: email, password });
    if (createResult.error) {
      setErrorMsg(createResult.error.message ?? 'Sign up failed.');
      return;
    }

    // Step 2: send email verification code
    const sendResult = await signUp.verifications.sendEmailCode();
    if (sendResult.error) {
      setErrorMsg(sendResult.error.message ?? 'Failed to send verification code.');
      return;
    }

    setPendingVerification(true);
  }

  async function handleVerify() {
    setErrorMsg('');

    // Step 3: verify the code
    const verifyResult = await signUp.verifications.verifyEmailCode({ code });
    if (verifyResult.error) {
      setErrorMsg(verifyResult.error.message ?? 'Verification failed.');
      return;
    }

    // Step 4: finalize — creates session and updates auth state
    const finalizeResult = await signUp.finalize();
    if (finalizeResult.error) {
      setErrorMsg(finalizeResult.error.message ?? 'Failed to complete sign up.');
    }
    // On success, ClerkProvider detects the new session and Stack.Protected
    // automatically redirects to (main)
  }

  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      backgroundColor: colors.backgroundElement,
      borderColor: colors.backgroundSelected,
    },
  ];

  if (pendingVerification) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}>
            <ThemedView style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                Check your email
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.subtitle}>
                We sent a code to {email}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.form}>
              <TextInput
                style={inputStyle}
                placeholder="Verification code"
                placeholderTextColor={colors.textSecondary}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
              />

              {errorMsg ? <ThemedText style={styles.error}>{errorMsg}</ThemedText> : null}

              <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                onPress={handleVerify}
                disabled={loading || !code}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText style={styles.buttonText}>Verify Email</ThemedText>
                )}
              </Pressable>
            </ThemedView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Create account
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              Start your wellness journey
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.form}>
            <TextInput
              style={inputStyle}
              placeholder="Email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
            />
            <TextInput
              style={inputStyle}
              placeholder="Password"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
            />

            {errorMsg ? <ThemedText style={styles.error}>{errorMsg}</ThemedText> : null}

            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleSignUp}
              disabled={loading || !email || !password}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Create Account</ThemedText>
              )}
            </Pressable>
          </ThemedView>

          <ThemedView style={styles.footer}>
            <ThemedText themeColor="textSecondary">Already have an account? </ThemedText>
            <Link href="/(auth)/sign-in">
              <ThemedText type="link">Sign in</ThemedText>
            </Link>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  keyboardView: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
    gap: Spacing.five,
  },
  header: { alignItems: 'center', gap: Spacing.one },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center' },
  form: { gap: Spacing.two },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  error: { color: '#ef4444', fontSize: 13, textAlign: 'center' },
  button: {
    height: 48,
    borderRadius: Spacing.two,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.one,
  },
  buttonPressed: { opacity: 0.8 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
