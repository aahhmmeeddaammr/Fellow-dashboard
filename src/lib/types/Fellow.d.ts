// Fellow Profile / Account
declare interface FellowAccountProps {
  id: string;
  fullName: string;
  nationalId: string;
  phoneNum: string;
  email: string;
  gender: string;
  pictureUrl: string; // backend sends "pictureUrl"
  joinDate: string; // ISO date string
}

// Fellow Dashboard Summary
declare interface FellowHomeDashboard extends FellowAccountProps {
  id: string;
  fullName: string;
  pictureUrl: string; // backend sends "imageUrl"
  totalNumberOfClasses: number; // typo fixed: "totol" → "total"
  groups: FellowHomeGroup[];
}

// Groups under a fellow
declare interface FellowHomeGroup {
  ageGroup: string;
  date: string;
  endTime: string;
  groupName: string;
  id: number;
  materialsLink: string;
  meetingLink: string;
  packageName: string;
  sessionOrder: number;
  startTime: string;
  groupId: number;
  schedule: string;
  studentsNumber: number;
  packgeName: string;
}

// Fellow Session details (from /fellow sessions endpoint)
declare interface FellowSessionDetails {
  id: number;
  attendanceStatus?: string;
  bAndS?: string;
  eAndP?: string;
  lAndC?: string;
  quizScore?: string;
  review?: string;
  studentId?: string;
  studentImageUrl?: string;
  studentName?: string;
  taskScore?: string;
  taskSubmissionLink?: string;
  action?: string;
}

// Calendar-like response (today, upcoming, old sessions)
declare interface CalendarType {
  oldClasses: CalendarClassType[];
  upcomingClasses: CalendarClassType[];
  todayClass: CalendarClassType | null; // safer to allow null if none
}

declare interface CalendarClassType {
  day: string; // you will probably compute this from "date"
  status: string; // "upcoming" | "completed" | "today"
  className: string; // sessionName
  startTime: string; // ISO string
  zoomLink: string; // meetingLink
}

// Calendar props (variant with sessions split by category)
declare interface FellowCalendarProps {
  upcomingSessions: FellowSessionProps[];
  previousSessions: FellowSessionProps[];
  todaySessions: FellowSessionProps[];
}

declare interface FellowSessionProps {
  id: number;
  groupName: string;
  sessionNumber: number; // maps to sessionOrder
  date: string;
  sessionStartTime: string; // startTime
  sessionEndTime: string; // endTime
  weekDay: string; // you can derive from date
  studentsNumber?: number; // not always present
  ageGroup: string; // backend sends string, not number
  zoomLink: string;
  startTime: string;
  meetingLink: string;
  packageName: string;
  sessionOrder: number;
}

// Sessions for a group
declare interface GroupSession {
  sessionId: number;
  sessionOrder: number;
  sessionDate: string;
  sessionName: string;
  sessionRecordingLink: string;
}

// Students in a session
declare interface SessionStudent {
  studentId: string;
  studentName: string;
  studentImageUrl: string;
  attendanceStatus: string | null;
  review: string | null;
  taskSubmissionLink: string | null;
  eAndP: string | null;
  lAndC: string | null;
  bAndS: string | null;
  quizScore: number | null;
  taskScore: number | null;
}

// Home table format (frontend view model)
declare interface FellowHomeTable {
  date: string; // ISO or formatted string
  package: string;
  age: string;
  group: string;
  classNumber: string;
  materials: string | null; // link
}

// Support request system
declare interface SupportRequest {
  topic: string;
  requestType: string;
  requestDate: string; // backend likely ISO date string
  status: "Pending" | "Approved" | "Rejected";
}

declare interface FellowUpcommingSessions {
  todays: FellowSessionProps[];
  upcoming: FellowSessionProps[];
}
