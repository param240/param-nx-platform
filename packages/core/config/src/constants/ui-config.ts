// UI config enums

export enum WidgetType {
  VitalsChart = 'vitals_chart',
  MedicationTracker = 'medication_tracker',
  SymptomLog = 'symptom_log',
  AppointmentCard = 'appointment_card',
  SideEffectSummary = 'side_effect_summary',
  GlucoseTrend = 'glucose_trend',
  WeightTrend = 'weight_trend',
  InjectionLog = 'injection_log',
  NextSessionCard = 'next_session_card',
  LabResultCard = 'lab_result_card',
  AiChatShortcut = 'ai_chat_shortcut',
}

export enum ScreenKey {
  Dashboard = 'dashboard',
  Medications = 'medications',
  Symptoms = 'symptoms',
  Appointments = 'appointments',
  Vitals = 'vitals',
  AiChat = 'ai_chat',
  Education = 'education',
  Reports = 'reports',
  // Oncology only
  ChemoSessions = 'chemo_sessions',
  SideEffects = 'side_effects',
  LabResults = 'lab_results',
  // Diabetes only
  GlucoseTracker = 'glucose_tracker',
  InsulinLog = 'insulin_log',
  MealLog = 'meal_log',
  // Obesity only
  WeightTracker = 'weight_tracker',
  InjectionLog = 'injection_log',
  AppetiteLog = 'appetite_log',
}
