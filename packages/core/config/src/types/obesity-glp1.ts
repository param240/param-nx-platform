import { GLP1Drug, GLP1SideEffect, TitrationPhase } from '../constants/obesity-glp1';
import { BodySite } from '../constants/shared';
import { ISO8601, ProviderInfo, Timestamp, UUID } from './shared';

export interface ObesityProfile {
  patientId: UUID;
  startingWeightKg: number;
  currentWeightKg: number;
  targetWeightKg: number;
  startingBmi: number;
  currentBmi: number;
  heightCm: number;
  glp1DrugName: GLP1Drug;
  currentDoseMcg: number;
  injectionFrequency: 'weekly' | 'daily';
  titrationPhase: TitrationPhase;
  programStartDate: ISO8601;
  comorbidities: string[]; // e.g. ["T2 diabetes", "hypertension", "NAFLD"]
  prescriber: ProviderInfo;
  dietitian?: ProviderInfo;
  behaviouralCoach?: ProviderInfo;
  updatedAt: Timestamp;
}

export interface WeightEntry {
  id: UUID;
  patientId: UUID;
  weightKg: number;
  bmi: number;
  waistCircumferenceCm?: number;
  hipCircumferenceCm?: number;
  bodyFatPercent?: number;
  source: 'manual' | 'healthkit' | 'health_connect' | 'smart_scale';
  deviceId?: string;
  recordedAt: Timestamp;
  weekNumber: number; // weeks since program start
  deltaFromStartKg: number; // total loss from baseline
  deltaPreviousKg: number; // change from last entry
}

export interface InjectionLog {
  id: UUID;
  patientId: UUID;
  drug: GLP1Drug;
  doseMcg: number;
  injectionSite: BodySite;
  administeredAt: Timestamp;
  nextDueAt: Timestamp;
  penLotNumber?: string;
  expiryDate?: ISO8601;
  sideEffects: GLP1SideEffect[];
  sideEffectSeverity?: Record<GLP1SideEffect, number>; // 0–10
  notes?: string;
}

export interface AppetiteLog {
  id: UUID;
  patientId: UUID;
  loggedAt: Timestamp;
  hungerLevel: number; // 1–10
  satietyLevel: number; // 1–10
  cravings: string[];
  nauseaLevel: number; // 0–10
  caloriesConsumed?: number;
  waterIntakeMl?: number;
  emotionalEating: boolean;
  moodRating?: number; // 1–5
  notes?: string;
}
