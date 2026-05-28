import { CancerStage, CancerType, SessionStatus, TreatmentPhase } from '../constants/oncology';
import { ISO8601, LocationInfo, ProviderInfo, RangeConfig, Timestamp, UUID } from './shared';

export interface BiomarkerResult {
  name: string; // e.g. "HER2", "BRCA1", "PD-L1"
  result: 'positive' | 'negative' | 'unknown';
  value?: string;
  testedAt: ISO8601;
}

export interface OncologyProfile {
  patientId: UUID; // PK + FK → Patient
  cancerType: CancerType;
  cancerSubtype?: string;
  stage: CancerStage;
  diagnosisDate: ISO8601;
  treatmentPhase: TreatmentPhase;
  oncologist: ProviderInfo;
  palliativeCareTeam?: ProviderInfo[];
  biomarkers: BiomarkerResult[];
  geneticMarkers: string[]; // e.g. ["BRCA1 mutation", "MSI-High"]
  clinicalTrialId?: string;
  clinicalTrialName?: string;
  updatedAt: Timestamp;
}

export interface ChemoSession {
  id: UUID;
  patientId: UUID;
  cycleNumber: number;
  sessionNumber: number; // session within cycle
  sessionDate: ISO8601;
  drugs: string[]; // e.g. ["Carboplatin", "Paclitaxel"]
  durationMinutes: number;
  status: SessionStatus;
  location: LocationInfo;
  nurseNotes?: string;
  premedications?: string[];
  nextSessionDate?: ISO8601;
}

export interface SideEffect {
  code: string; // CTCAE term
  label: string;
  severity: number; // 1–10
}

export interface SideEffectLog {
  id: UUID;
  patientId: UUID;
  chemoSessionId?: UUID;
  loggedAt: Timestamp;
  effects: SideEffect[];
  nausea: number; // 0–10
  vomiting: number;
  fatigue: number;
  hairLoss: number;
  mucositis: number;
  neuropathy: number;
  painLevel: number;
  ctcaeGrade?: 1 | 2 | 3 | 4 | 5; // Common Terminology Criteria
  reportedToMd: boolean;
  notes?: string;
}

export interface LabResult {
  id: UUID;
  patientId: UUID;
  testName: string; // "WBC", "ANC", "Hemoglobin", "CA-125"
  value: number;
  unit: string;
  referenceRange: RangeConfig;
  isAbnormal: boolean;
  trend?: 'improving' | 'worsening' | 'stable';
  collectedAt: Timestamp;
  resultAt: Timestamp;
  lab?: string;
  reportUrl?: string;
  orderedBy?: string;
}

