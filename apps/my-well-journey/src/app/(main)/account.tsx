import { useClerk, useUser } from '@clerk/expo';
import { Image } from 'expo-image';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const GENDER_LABELS: Record<string, string> = {
  male: 'Male',
  female: 'Female',
  non_binary: 'Non-binary',
  prefer_not_to_say: 'Prefer not to say',
};

const PROGRAM_LABELS: Record<string, string> = {
  oncology: 'Cancer Care Companion',
  diabetes: 'Diabetes Care Manager',
  obesity_glp1: 'Weight Care Program',
};

function formatDate(date: Date | null | undefined): string {
  if (!date) return '—';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <ThemedView style={styles.infoRow}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.infoLabel}>
        {label}
      </ThemedText>
      <ThemedText type="small" style={styles.infoValue} numberOfLines={1}>
        {value}
      </ThemedText>
    </ThemedView>
  );
}

export default function AccountScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded || !user) {
    return <ThemedView style={styles.container} />;
  }

  const displayName = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'User';
  const email = user.primaryEmailAddress?.emailAddress ?? '—';
  const userId = user.id ? `${user.id.slice(0, 8)}…` : '—';

  const meta = (user.unsafeMetadata ?? {}) as Record<string, string>;
  const dob     = meta.dateOfBirth || '—';
  const gender  = GENDER_LABELS[meta.gender] ?? '—';
  const phone   = meta.phone || '—';
  const program = PROGRAM_LABELS[meta.conditionKey] ?? '—';

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'web' && { paddingBottom: BottomTabInset + Spacing.four },
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.maxWidth}>
            {/* Avatar + name + email */}
            <ThemedView style={styles.avatarSection}>
              {user.imageUrl ? (
                <Image
                  source={{ uri: user.imageUrl }}
                  style={styles.avatar}
                  contentFit="cover"
                />
              ) : (
                <ThemedView type="backgroundElement" style={[styles.avatar, styles.avatarFallback]}>
                  <ThemedText type="subtitle">
                    {displayName.charAt(0).toUpperCase()}
                  </ThemedText>
                </ThemedView>
              )}

              <ThemedText type="subtitle" style={styles.displayName}>
                {displayName}
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.email}>
                {email}
              </ThemedText>
            </ThemedView>

            {/* Profile card */}
            <ThemedText type="small" themeColor="textSecondary" style={styles.sectionTitle}>
              Profile
            </ThemedText>
            <ThemedView type="backgroundElement" style={styles.infoCard}>
              <InfoRow label="Date of birth" value={dob} />
              <ThemedView style={styles.divider} />
              <InfoRow label="Gender" value={gender} />
              <ThemedView style={styles.divider} />
              <InfoRow label="Phone" value={phone} />
              <ThemedView style={styles.divider} />
              <InfoRow label="Program" value={program} />
            </ThemedView>

            {/* Account info card */}
            <ThemedText type="small" themeColor="textSecondary" style={styles.sectionTitle}>
              Account
            </ThemedText>
            <ThemedView type="backgroundElement" style={styles.infoCard}>
              <InfoRow label="Member since" value={formatDate(user.createdAt)} />
              <ThemedView style={styles.divider} />
              <InfoRow label="User ID" value={userId} />
            </ThemedView>

            {/* Sign out */}
            <Pressable
              style={({ pressed }) => [styles.signOutButton, pressed && styles.signOutPressed]}
              onPress={() => signOut()}>
              <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, alignItems: 'center' },
  scroll: {
    // Override parent's alignItems: 'center' so ScrollView fills full width
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
  avatarSection: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingBottom: Spacing.two,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayName: {
    textAlign: 'center',
  },
  email: {
    textAlign: 'center',
    fontSize: 14,
  },
  infoCard: {
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
  infoLabel: {
    flex: 1,
  },
  infoValue: {
    flex: 2,
    textAlign: 'right',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(128,128,128,0.2)',
    marginHorizontal: -Spacing.three,
  },
  sectionTitle: {
    marginBottom: Spacing.one,
    marginLeft: Spacing.one,
    fontWeight: '500',
  },
  signOutButton: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#ef4444',
    alignSelf: 'center',
    marginTop: Spacing.two,
  },
  signOutPressed: { opacity: 0.7 },
  signOutText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
});
