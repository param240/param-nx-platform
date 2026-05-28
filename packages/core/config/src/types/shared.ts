import {
  AppointmentStatus,
  AppointmentType,
  ConditionKey,
  DosageUnit,
  RouteType,
  StreamStatus,
  UserRole,
  VitalSource,
  VitalType,
} from '../constants/shared';

// ─────────────────────────────────────────────
// Primitive type aliases
// ─────────────────────────────────────────────

export type UUID = string;
export type ISO8601 = string; // "2025-05-28T10:30:00Z"
export type Timestamp = number; // Unix ms

// ─────────────────────────────────────────────
// Shared config shapes
// ─────────────────────────────────────────────

export type FrequencyConfig = {
  times: number;
  period: 'day' | 'week' | 'month';
  specificTimes?: string[]; // ["08:00", "20:00"]
  asNeeded: boolean;
};

export interface RangeConfig {
  min: number;
  max: number;
  criticalMin?: number;
  criticalMax?: number;
  unit: string;
}

// ─────────────────────────────────────────────
// Core patient entities
// ─────────────────────────────────────────────

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface ProviderInfo {
  name: string;
  specialty: string;
  phone?: string;
  email?: string;
  npi?: string; // National Provider Identifier (US)
  hospitalAffiliation?: string;
}

export interface LocationInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates?: { lat: number; lng: number };
}

export interface Patient {
  id: UUID;
  tenantId: string; // multi-tenant support
  conditionKey: ConditionKey;
  role: UserRole;
  firstName: string;
  lastName: string;
  dateOfBirth: ISO8601;
  gender: string;
  email: string;
  phone?: string;
  timezone: string;
  caregiverIds: UUID[];
  emergencyContact?: EmergencyContact;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────────
// Medication
// ─────────────────────────────────────────────

export interface Medication {
  id: UUID;
  patientId: UUID;
  name: string;
  genericName?: string;
  dosage: string;
  unit: DosageUnit;
  frequency: FrequencyConfig;
  route: RouteType;
  prescribedBy: string;
  startDate: ISO8601;
  endDate?: ISO8601;
  remindersEnabled: boolean;
  reminderTimes: string[]; // ["08:00", "20:00"]
  refillAlertDays: number; // alert N days before running out
  remainingDoses?: number;
  notes?: string;
  createdAt: Timestamp;
}

export interface MedicationLog {
  id: UUID;
  medicationId: UUID;
  patientId: UUID;
  scheduledAt: Timestamp;
  takenAt?: Timestamp;
  status: 'taken' | 'missed' | 'skipped' | 'pending';
  skippedReason?: string;
  notes?: string;
}

// ─────────────────────────────────────────────
// Symptoms
// ─────────────────────────────────────────────

export interface SymptomEntry {
  symptomCode: string; // e.g. "nausea", "fatigue", "pain"
  severity: number; // 1–10
  bodyLocation?: string;
}

export interface SymptomLog {
  id: UUID;
  patientId: UUID;
  loggedAt: Timestamp;
  symptoms: SymptomEntry[];
  overallSeverity: number; // 1–10
  mood?: number; // 1–5
  energyLevel?: number; // 1–5
  notes?: string;
  isOfflineDraft: boolean;
  syncedAt?: Timestamp;
}

// ─────────────────────────────────────────────
// Appointments
// ─────────────────────────────────────────────

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface Appointment {
  id: UUID;
  patientId: UUID;
  type: AppointmentType;
  scheduledAt: Timestamp;
  durationMinutes: number;
  provider: ProviderInfo;
  location?: LocationInfo;
  telehealthUrl?: string;
  status: AppointmentStatus;
  preVisitChecklist: ChecklistItem[];
  postVisitNotes?: string;
  remindersSent: Timestamp[];
  createdAt: Timestamp;
}

// ─────────────────────────────────────────────
// AI Chat
// ─────────────────────────────────────────────

export interface ChatMessage {
  id: UUID;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Timestamp;
  isStreaming?: boolean;
}

export interface ConditionContext {
  conditionKey: ConditionKey;
  recentSymptoms?: string[];
  recentMedications?: string[];
  systemPromptAddendum?: string; // condition-specific LLM instructions
}

export interface ChatSession {
  id: UUID;
  patientId: UUID;
  messages: ChatMessage[];
  context: ConditionContext;
  streamStatus: StreamStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─────────────────────────────────────────────
// Vitals
// ─────────────────────────────────────────────

export interface VitalReading {
  id: UUID;
  patientId: UUID;
  type: VitalType;
  value: number;
  unit: string;
  source: VitalSource;
  deviceId?: string;
  recordedAt: Timestamp;
  isAlert: boolean;
  alertThreshold?: RangeConfig;
}

