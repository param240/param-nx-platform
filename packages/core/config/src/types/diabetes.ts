import { DiabetesType, GlucoseContext, InsulinType, MealRelation } from '../constants/diabetes';
import { BodySite } from '../constants/shared';
import { ISO8601, ProviderInfo, Timestamp, UUID } from './shared';

export interface DiabetesProfile {
  patientId: UUID;
  diabetesType: DiabetesType;
  diagnosisDate: ISO8601;
  targetHbA1c: number; // e.g. 7.0
  glucoseTargetMin: number; // mg/dL, e.g. 80
  glucoseTargetMax: number; // mg/dL, e.g. 180
  hypoglycemiaThreshold: number; // e.g. 70
  hyperglycemiaThreshold: number; // e.g. 250
  insulinDependent: boolean;
  usesInsulinPump: boolean;
  cgmDeviceId?: string;
  cgmProvider?: 'dexcom' | 'freestyle_libre' | 'medtronic' | 'other';
  endocrinologist: ProviderInfo;
  dietitian?: ProviderInfo;
  updatedAt: Timestamp;
}

export interface GlucoseReading {
  id: UUID;
  patientId: UUID;
  value: number; // mg/dL
  mmol?: number; // mmol/L (auto-computed)
  readingContext: GlucoseContext;
  source: 'manual' | 'cgm' | 'healthkit' | 'health_connect';
  deviceId?: string;
  recordedAt: Timestamp;
  isHypoglycemia: boolean; // < threshold
  isHyperglycemia: boolean; // > threshold
  trendArrow?: 'rising_fast' | 'rising' | 'stable' | 'falling' | 'falling_fast';
  mealLogId?: UUID;
}

export interface InsulinLog {
  id: UUID;
  patientId: UUID;
  insulinType: InsulinType;
  insulinBrand?: string;
  units: number;
  injectionSite: BodySite;
  glucoseAtTime?: number; // mg/dL before injection
  administeredAt: Timestamp;
  mealRelation: MealRelation;
  correctionFactor?: number;
  carbRatio?: number;
}

export interface FoodItem {
  name: string;
  carbsGrams: number;
  portionSize?: string;
  glycemicIndex?: number;
}

export interface MealLog {
  id: UUID;
  patientId: UUID;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: FoodItem[];
  totalCarbohydrates: number; // grams
  calories?: number;
  fiber?: number;
  protein?: number;
  fat?: number;
  glycemicLoad?: number;
  photoUrl?: string;
  loggedAt: Timestamp;
  preGlucoseReadingId?: UUID;
  postGlucoseReadingId?: UUID;
}
