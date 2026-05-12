export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  relationship: 'mother' | 'father' | 'guardian';
}

export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  avatar?: string;
  classroom: string;
  teacher: string;
  enrollmentDate: string;
  allergies: string[];
  medicalNotes: string;
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface DailyReport {
  id: string;
  childId: string;
  date: string;
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'tired';
  meals: MealRecord[];
  naps: NapRecord[];
  activities: string[];
  notes: string;
  photos: string[];
  teacherName: string;
}

export interface MealRecord {
  type: 'breakfast' | 'lunch' | 'snack' | 'dinner';
  time: string;
  consumed: 'all' | 'most' | 'some' | 'none';
  items: string[];
}

export interface NapRecord {
  startTime: string;
  endTime: string;
  duration: number;
}

export interface AttendanceRecord {
  id: string;
  childId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'early-pickup';
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  period: string;
  dueDate: string;
  issueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  paidDate?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface GalleryPhoto {
  id: string;
  childId: string;
  url: string;
  thumbnail: string;
  caption?: string;
  date: string;
  uploadedBy: string;
  tags: string[];
}

export interface Notification {
  id: string;
  type: 'message' | 'report' | 'billing' | 'attendance' | 'alert' | 'event';
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  data?: Record<string, string>;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: 'holiday' | 'activity' | 'meeting' | 'performance' | 'field-trip';
}
