// Oncology-specific enums

export enum CancerType {
  Breast = 'breast',
  Lung = 'lung',
  Colorectal = 'colorectal',
  Prostate = 'prostate',
  Ovarian = 'ovarian',
  Lymphoma = 'lymphoma',
  Leukemia = 'leukemia',
  Melanoma = 'melanoma',
  Pancreatic = 'pancreatic',
  Other = 'other',
}

export enum CancerStage {
  I = 'I',
  II = 'II',
  III = 'III',
  IV = 'IV',
  Unknown = 'unknown',
}

export enum TreatmentPhase {
  ActiveChemo = 'active_chemo',
  ActiveImmunotherapy = 'active_immunotherapy',
  ActiveTargeted = 'active_targeted',
  Radiation = 'radiation',
  SurgeryRecovery = 'surgery_recovery',
  Maintenance = 'maintenance',
  Surveillance = 'surveillance',
  Palliative = 'palliative',
}

export enum SessionStatus {
  Scheduled = 'scheduled',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
  Postponed = 'postponed',
}
