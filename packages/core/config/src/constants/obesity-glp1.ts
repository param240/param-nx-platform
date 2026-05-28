// Obesity / GLP-1 specific enums

export enum GLP1Drug {
  SemaglutideOzempic = 'semaglutide_ozempic',
  SemaglutideWegovy = 'semaglutide_wegovy',
  LiraglutideSaxenda = 'liraglutide_saxenda',
  TirzepatideMounjaro = 'tirzepatide_mounjaro',
  TirzepatideZepbound = 'tirzepatide_zepbound',
  DulaglutideTrulicity = 'dulaglutide_trulicity',
  ExenatideBydureon = 'exenatide_bydureon',
  Other = 'other',
}

export enum TitrationPhase {
  Initiation = 'initiation',
  Titration1 = 'titration_1',
  Titration2 = 'titration_2',
  Maintenance = 'maintenance',
}

export enum GLP1SideEffect {
  Nausea = 'nausea',
  Vomiting = 'vomiting',
  Diarrhea = 'diarrhea',
  Constipation = 'constipation',
  AbdominalPain = 'abdominal_pain',
  InjectionSiteReaction = 'injection_site_reaction',
  Headache = 'headache',
  Fatigue = 'fatigue',
  Dizziness = 'dizziness',
  PancreatitisConcern = 'pancreatitis_concern',
}
