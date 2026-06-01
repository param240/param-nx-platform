import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Stack } from 'expo-router';

function RootLayoutNav() {
  const { isSignedIn, isLoaded } = useAuth();

  // Keep splash screen until Clerk has restored the session
  if (!isLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(main)" />
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}
