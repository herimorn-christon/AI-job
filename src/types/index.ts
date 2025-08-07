export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  recommendedJobs?: Job[];
  recommendedCourses?: Course[];
  recommendedPaths?: CareerPath[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  endorsed: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  inProgress: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'gig';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  deadlineDate: string;
  matchScore?: number;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  description: string;
  certificate: boolean;
  cost: {
    amount: number;
    currency: string;
  };
  relevanceScore?: number;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  stages: CareerStage[];
  demandScore: number;
  growthRate: number;
  matchScore?: number;
}

export interface CareerStage {
  level: string;
  skills: string[];
  courses: string[];
  experience: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviews: number;
  available: boolean;
  hourlyRate?: {
    amount: number;
    currency: string;
  };
}