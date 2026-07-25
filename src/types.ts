export interface Child {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  disabilityType: string;
  medicalHistory: string;
  goals: string[];
  motorScore: number;
  cognitiveScore: number;
  engagementLevel: number;
  improvementPrediction: number;
  assignedTherapist: string;
  assignedTeacher: string;
  parentName: string;
  parentPhone: string;
  avatar: string;
}

export interface IEPPlan {
  id: string;
  childId: string;
  childName: string;
  diagnosis: string;
  shortTermGoals: string[];
  longTermGoals: string[];
  activities: string[];
  therapyTypes: string[];
  evaluationCriteria: string;
  accommodations: string[];
  createdDate: string;
  status: 'نشط' | 'مكتمل' | 'قيد المراجعة';
}

export interface Assessment {
  id: string;
  childId: string;
  childName: string;
  assessmentType: string;
  date: string;
  gaitSymmetryScore: number;
  postureBalanceScore: number;
  romScore: number;
  cognitiveFocusScore: number;
  overallScore: number;
  notes: string;
  aiRecommendations: string[];
}

export interface TherapySession {
  id: string;
  childId: string;
  childName: string;
  therapistName: string;
  exercise: string;
  category: 'تأهيل حركي' | 'تربية خاصة' | 'علاج وظيفي' | 'تخاطب';
  durationMinutes: number;
  progressPercent: number;
  sessionDate: string;
  notes: string;
}

export interface ResearchPaper {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'التربية الخاصة' | 'التأهيل الحركي' | 'الذكاء الاصطناعي الطبي' | 'التقنيات المساعدة';
  author: string;
  year: number;
  journal: string;
  summaryAr: string;
  keyFindings: string[];
  readTime: string;
}

export interface HomeExercise {
  id: string;
  title: string;
  category: string;
  duration: string;
  reps: string;
  completed: boolean;
  videoThumb: string;
  instructions: string[];
  tips: string;
}

export type PageId = 
  | 'home' 
  | 'solutions' 
  | 'assessment' 
  | 'iep-builder' 
  | 'therapist-dashboard' 
  | 'parent-dashboard' 
  | 'research-hub' 
  | 'therapy-games';
