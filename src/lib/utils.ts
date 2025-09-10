import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple in-browser data layer for demo purposes
type Role = "admin" | "doctor" | "patient" | "hospital";
export type DemoUser = {
  email: string;
  name: string;
  role: Role;
};

export type Appointment = {
  id: string;
  patientEmail: string;
  doctorEmail: string;
  date: string; // ISO
  time: string; // HH:mm
  department?: string;
  status: "confirmed" | "pending";
};

export type Notification = {
  id: string;
  toEmail: string;
  createdAt: string; // ISO
  type: "appointment_request" | "appointment_update";
  message: string;
  read?: boolean;
  data?: Record<string, any>;
};

const USERS_KEY = "medease_users";
const APPTS_KEY = "medease_appointments";
const NOTIFS_KEY = "medease_notifications";
const DOCS_KEY = "medease_documents";
const HISTORY_KEY = "medease_history";

export function readUsers(): any[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeUsers(users: any[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function upsertUser(user: any) {
  const users = readUsers();
  const idx = users.findIndex((u) => u.email?.toLowerCase() === user.email?.toLowerCase());
  if (idx >= 0) users[idx] = { ...users[idx], ...user };
  else users.push(user);
  writeUsers(users);
}

export function readAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeAppointments(appts: Appointment[]) {
  localStorage.setItem(APPTS_KEY, JSON.stringify(appts));
}

export function addAppointment(appt: Appointment) {
  const all = readAppointments();
  all.push(appt);
  writeAppointments(all);
}

export function updateAppointment(id: string, updates: Partial<Appointment>) {
  const all = readAppointments();
  const idx = all.findIndex((a) => a.id === id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...updates } as Appointment;
    writeAppointments(all);
  }
}

export function readNotifications(): Notification[] {
  try {
    const raw = localStorage.getItem(NOTIFS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeNotifications(notifs: Notification[]) {
  localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifs));
}

export function addNotification(notif: Notification) {
  const all = readNotifications();
  all.unshift(notif);
  writeNotifications(all);
}

// Documents
export type PatientDocument = {
  id: string;
  patientEmail: string;
  name: string;
  uploadedAt: string; // ISO
  dataUrl: string; // base64 URL for demo
};

export function readDocuments(): PatientDocument[] {
  try {
    const raw = localStorage.getItem(DOCS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeDocuments(docs: PatientDocument[]) {
  localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
}

export function addDocument(doc: PatientDocument) {
  const all = readDocuments();
  all.unshift(doc);
  writeDocuments(all);
}

// Medical history
export type MedicalHistoryEntry = {
  id: string;
  patientEmail: string;
  date: string; // ISO
  summary: string;
  critical?: boolean;
};

export function readHistory(): MedicalHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeHistory(items: MedicalHistoryEntry[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

export function addHistory(entry: MedicalHistoryEntry) {
  const all = readHistory();
  all.unshift(entry);
  writeHistory(all);
}

export function generateId(prefix: string = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
