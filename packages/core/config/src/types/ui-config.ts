import { ConditionKey, VitalSource, VitalType } from '../constants/shared';
import { ScreenKey, WidgetType } from '../constants/ui-config';
import { FrequencyConfig, RangeConfig } from './shared';

export interface NavigationItem {
  key: ScreenKey;
  label: string;
  icon: string; // Tabler icon name, e.g. "ti-pill"
  badge?: 'count' | 'dot'; // notification badge style
}

export interface VitalConfig {
  type: VitalType;
  label: string;
  unit: string;
  normalRange: RangeConfig;
  trackingFrequency: FrequencyConfig;
  source: VitalSource[];
  showTrendChart: boolean;
  alertEnabled: boolean;
}

export interface SymptomOption {
  code: string;
  label: string;
  category: string;
  hasBodyMap: boolean;
  severityScale: '0-10' | '1-5';
}

export interface ReminderConfig {
  type: 'medication' | 'vitals' | 'injection' | 'appointment' | 'log_entry';
  defaultTimes: string[]; // ["08:00", "20:00"]
  canUserCustomize: boolean;
  pushEnabled: boolean;
  localFallback: boolean; // use local notification if no network
}

export interface EducationModule {
  id: string;
  title: string;
  description: string;
  contentType: 'article' | 'video' | 'quiz' | 'infographic';
  tags: string[];
  estimatedMinutes: number;
  requiredForOnboarding: boolean;
}

export interface DashboardLayout {
  primaryWidgets: WidgetType[]; // shown at top, always visible
  secondaryWidgets: WidgetType[]; // collapsible section
  quickActions: string[]; // FAB actions
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  screenKey: ScreenKey;
  required: boolean;
  order: number;
}

export interface AIAssistantConfig {
  systemPromptAddendum: string; // condition-specific LLM instructions
  suggestedQuestions: string[]; // starter questions shown in UI
  restrictedTopics: string[]; // safety guardrails
  triageEnabled: boolean;
  escalationKeywords: string[]; // trigger "contact your doctor" message
}

export interface ReportConfig {
  sections: string[];
  includeVitals: boolean;
  includeSymptoms: boolean;
  includeMedications: boolean;
  includeLabResults: boolean;
  exportFormat: ('pdf' | 'csv' | 'json')[];
  shareWithProvider: boolean;
}

export interface ThemeConfig {
  primaryColor: string; // hex
  accentColor: string;
  conditionIcon: string; // Tabler icon name
  headerGradientStart?: string;
  headerGradientEnd?: string;
}

/**
 * ConditionConfig is the heart of the multi-tenant config-driven architecture.
 * Each condition has a JSON config that drives:
 *  - Which screens are shown
 *  - Which vitals to track
 *  - Which symptoms to surface
 *  - AI chat system prompt
 *  - Reminder schedules
 *  - Dashboard widget layout
 */
export interface ConditionConfig {
  conditionKey: ConditionKey;
  displayName: string;
  shortName: string;
  version: string; // config schema version, e.g. "1.2.0"
  theme: ThemeConfig;
  navigation: NavigationItem[];
  dashboard: DashboardLayout;
  vitals: VitalConfig[];
  symptoms: SymptomOption[];
  reminders: ReminderConfig[];
  education: EducationModule[];
  onboardingSteps: OnboardingStep[];
  aiAssistant: AIAssistantConfig;
  report: ReportConfig;
  featureFlags: Record<string, boolean>;
  updatedAt: string;
}
