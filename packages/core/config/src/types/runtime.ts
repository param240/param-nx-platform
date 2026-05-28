import { Timestamp, UUID } from './shared';
import { OncologyProfile } from './oncology';
import { DiabetesProfile } from './diabetes';
import { ObesityProfile } from './obesity-glp1';

/** Union of all condition-specific profile types */
export type ConditionProfile =
  | OncologyProfile
  | DiabetesProfile
  | ObesityProfile;

/** Offline sync queue entry */
export interface SyncQueueEntry {
  id: UUID;
  entityType: 'SymptomLog' | 'MedicationLog' | 'GlucoseReading' | 'WeightEntry' | 'InjectionLog';
  payload: unknown;
  createdAt: Timestamp;
  retries: number;
  lastAttempt?: Timestamp;
}
