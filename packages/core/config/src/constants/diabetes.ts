// Diabetes-specific enums

export enum DiabetesType {
  T1 = 'T1',
  T2 = 'T2',
  Lada = 'LADA',
  Gestational = 'gestational',
  Prediabetes = 'prediabetes',
}

export enum GlucoseContext {
  Fasting = 'fasting',
  PreMeal = 'pre_meal',
  PostMeal1h = 'post_meal_1h',
  PostMeal2h = 'post_meal_2h',
  Bedtime = 'bedtime',
  Random = 'random',
  Exercise = 'exercise',
  HypoglycemiaCheck = 'hypoglycemia_check',
}

export enum InsulinType {
  RapidActing = 'rapid_acting',
  ShortActing = 'short_acting',
  Intermediate = 'intermediate',
  LongActing = 'long_acting',
  UltraLongActing = 'ultra_long_acting',
  Premixed = 'premixed',
}

export enum MealRelation {
  BeforeMeal = 'before_meal',
  WithMeal = 'with_meal',
  Correction = 'correction',
  Basal = 'basal',
  Bedtime = 'bedtime',
}
