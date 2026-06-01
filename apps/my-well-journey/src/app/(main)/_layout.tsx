import { useUser } from '@clerk/expo';
import { DarkTheme, DefaultTheme, Redirect, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

// Expo Router typed routes are generated at `expo start`; cast until then.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyHref = any;

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

export default function MainLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoaded } = useUser();

  // Wait for Clerk user to load before deciding
  if (!isLoaded) return null;

  // Step 1: profile setup
  if (!user?.unsafeMetadata?.profileSetupDone) {
    return <Redirect href={"/(onboarding)/user-profile" as AnyHref} />;
  }

  // Step 2: condition selection
  if (!user?.unsafeMetadata?.conditionKey) {
    return <Redirect href={"/(onboarding)/condition-select" as AnyHref} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
