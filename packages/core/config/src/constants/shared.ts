// Shared enums used across all conditions

export enum ConditionKey {
  Oncology = 'oncology',
  Diabetes = 'diabetes',
  ObesityGlp1 = 'obesity_glp1',
}

export enum RouteType {
  Oral = 'oral',
  Subcutaneous = 'subcutaneous',
  Intravenous = 'intravenous',
  Intramuscular = 'intramuscular',
  Topical = 'topical',
  Inhaled = 'inhaled',
  Other = 'other',
}

export enum DosageUnit {
  Mg = 'mg',
  Mcg = 'mcg',
  Ml = 'ml',
  Units = 'units',
  IU = 'IU',
  G = 'g',
  Tablet = 'tablet',
  Capsule = 'capsule',
}

export enum VitalType {
  BloodPressureSystolic = 'blood_pressure_systolic',
  BloodPressureDiastolic = 'blood_pressure_diastolic',
  HeartRate = 'heart_rate',
  Spo2 = 'spo2',
  Temperature = 'temperature',
  Weight = 'weight',
  Glucose = 'glucose',
  Hba1c = 'hba1c',
}

export enum VitalSource {
  Manual = 'manual',
  Healthkit = 'healthkit',
  HealthConnect = 'health_connect',
  Cgm = 'cgm',
  Device = 'device',
}

export enum AppointmentType {
  Consultation = 'consultation',
  FollowUp = 'follow_up',
  Infusion = 'infusion',
  Chemotherapy = 'chemotherapy',
  LabTest = 'lab_test',
  Imaging = 'imaging',
  Telehealth = 'telehealth',
}

export enum AppointmentStatus {
  Scheduled = 'scheduled',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Completed = 'completed',
  NoShow = 'no_show',
}

export enum StreamStatus {
  Idle = 'idle',
  Streaming = 'streaming',
  Complete = 'complete',
  Error = 'error',
}

export enum BodySite {
  Abdomen = 'abdomen',
  LeftThigh = 'left_thigh',
  RightThigh = 'right_thigh',
  LeftArm = 'left_arm',
  RightArm = 'right_arm',
  LeftButtock = 'left_buttock',
  RightButtock = 'right_buttock',
}

export enum UserRole {
  Patient = 'patient',
  Caregiver = 'caregiver',
  Nurse = 'nurse',
  Admin = 'admin',
}
