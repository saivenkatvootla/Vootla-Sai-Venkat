export enum View {
  DASHBOARD = 'DASHBOARD',
  MEALS = 'MEALS',
  MAP = 'MAP',
  ACADEMICS = 'ACADEMICS',
  SUPPORT = 'SUPPORT',
}

export interface Assignment {
  id: string;
  course: string;
  title: string;
  dueDate: Date;
  type: 'assignment' | 'quiz' | 'exam';
  completed: boolean;
}

export interface MealOption {
  id: string;
  name: string;
  calories: number;
  type: 'breakfast' | 'lunch' | 'dinner';
  image: string;
  tags: string[];
}

export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  mealId: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface LocationMarker {
  id: string;
  name: string;
  category: 'dorm' | 'academic' | 'food' | 'recreation';
  x: number; // Percentage
  y: number; // Percentage
  status?: string;
}
