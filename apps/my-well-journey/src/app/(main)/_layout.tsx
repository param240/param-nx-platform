import { useUser } from '@clerk/expo';
import { DarkTheme, DefaultTheme, Redirect, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

export default function MainLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoaded } = useUser();

  // Wait for Clerk user to load before deciding
  if (!isLoaded) return null;

  // Redirect to onboarding if the user hasn't chosen a condition yet
  if (!user?.unsafeMetadata?.conditionKey) {
    return <Redirect href="/(onboarding)/condition-select" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
