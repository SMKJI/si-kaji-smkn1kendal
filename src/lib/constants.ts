
/**
 * Application constants
 */

// App information
export const APP_NAME = "Si-Kaji";
export const APP_DESCRIPTION = "Sistem Informasi Kesiswaan SMKN 1 Kendal";
export const APP_SCHOOL = "SMKN 1 Kendal";

// Route paths
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  STUDENT: "/student",
  TEACHER: "/teacher",
  CLASS: "/class",
  ATTENDANCE: "/attendance",
  COMPLAINT: "/complaint",
  PARENT_COMPLAINT: "/parent-complaint",
  PARENT_PORTAL: "/parent-portal",
  PARENT_DASHBOARD: "/parent-portal/dashboard",
  PARENT_ACADEMIC: "/parent-portal/academic",
  PARENT_ATTENDANCE: "/parent-portal/attendance",
  PARENT_DISCIPLINE: "/parent-portal/discipline",
  PARENT_ASSIGNMENTS: "/parent-portal/assignments",
  COUNSELING: "/counseling",
  COUNSELING_MANAGE: "/counseling/manage",
  COUNSELING_SESSION: "/counseling/session",
  PERMISSION: "/permission",
  PERMISSION_CREATE: "/permission/create",
  STUDENT_DATA: "/student-data",
  STUDENT_ACTIVITIES: "/student-activities",
  CLASS_JOURNAL: "/class-journal", 
  CLASS_JOURNAL_CREATE: "/class-journal/create",
  DISCIPLINE: "/discipline",
  DISCIPLINE_RECORD: "/discipline/record",
  DISCIPLINE_MANAGE: "/discipline/manage",
  ACHIEVEMENTS: "/achievements",
  CERTIFICATES: "/certificates",
  EXTRACURRICULAR: "/extracurricular",
  EXTRACURRICULAR_MANAGE: "/extracurricular/manage",
  CALENDAR: "/calendar",
  CALENDAR_CREATE: "/calendar/create",
  ANNOUNCEMENT: "/announcement",
  PROPOSAL: "/proposal",
  REPORTS: "/reports",
  SETTINGS: "/settings",
  NOT_FOUND: "*"
};

// User roles
export const USER_ROLES = {
  ADMIN: "admin",
  PRINCIPAL: "principal", // Kepala Sekolah
  WAKA: "waka", // Waka Kesiswaan
  TPPK: "tppk", // Satgas TPPK
  TEACHER: "teacher", // Guru
  COUNSELOR: "counselor", // Guru BK
  CLASS_TEACHER: "class_teacher", // Wali Kelas
  STUDENT: "student",
  PARENT: "parent",
  TRAINER: "trainer" // Pelatih Ekstrakurikuler
};

// Feature descriptions for reference
export const FEATURES = {
  STUDENT_MANAGEMENT: "Manajemen data lengkap siswa termasuk profil, prestasi, dan monitoring kehadiran",
  COMPLAINT_SYSTEM: "Sistem pengaduan online dengan tracking tiket dan pelaporan anonim",
  ATTENDANCE: "Sistem presensi dengan RFID & QR Code untuk kehadiran dan kegiatan",
  DISCIPLINE: "Pencatatan pelanggaran tata tertib & prestasi siswa dengan sistem poin",
  PERMISSION: "Sistem perizinan online untuk ketidakhadiran, dispensasi, dan kegiatan",
  ACTIVITY_PROPOSAL: "Pengajuan proposal kegiatan siswa dan peminjaman fasilitas",
  PARENT_PORTAL: "Portal monitoring siswa untuk orang tua dengan notifikasi",
  COUNSELING: "Sistem layanan bimbingan konseling untuk siswa",
  CERTIFICATE: "Sistem permohonan surat keterangan aktif siswa",
  JOURNAL: "Jurnal perwalian digital untuk wali kelas",
  EXTRACURRICULAR: "Pengelolaan kegiatan ekstrakurikuler dan presensi peserta",
  ACHIEVEMENTS: "Pencatatan dan pengelolaan prestasi siswa",
  CALENDAR: "Kalender akademik dan kegiatan sekolah"
};

// API endpoints (for future use)
export const API = {
  BASE_URL: "/api",
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password"
  },
  STUDENT: {
    GET_ALL: "/students",
    GET_BY_ID: "/students/:id",
    CREATE: "/students",
    UPDATE: "/students/:id",
    DELETE: "/students/:id"
  },
  TEACHER: {
    GET_ALL: "/teachers",
    GET_BY_ID: "/teachers/:id",
    CREATE: "/teachers",
    UPDATE: "/teachers/:id",
    DELETE: "/teachers/:id"
  },
  CLASS: {
    GET_ALL: "/classes",
    GET_BY_ID: "/classes/:id",
    CREATE: "/classes",
    UPDATE: "/classes/:id",
    DELETE: "/classes/:id"
  },
  ATTENDANCE: {
    GET_BY_CLASS: "/attendance/class/:id",
    GET_BY_STUDENT: "/attendance/student/:id",
    CREATE: "/attendance",
    UPDATE: "/attendance/:id"
  },
  COMPLAINT: {
    GET_ALL: "/complaints",
    GET_BY_ID: "/complaints/:id",
    CREATE: "/complaints",
    UPDATE: "/complaints/:id",
    GET_BY_TICKET: "/complaints/ticket/:code"
  },
  COUNSELING: {
    GET_ALL: "/counseling",
    GET_BY_ID: "/counseling/:id",
    CREATE: "/counseling",
    UPDATE: "/counseling/:id",
    GET_BY_STUDENT: "/counseling/student/:id"
  },
  JOURNAL: {
    GET_ALL: "/journals",
    GET_BY_ID: "/journals/:id",
    CREATE: "/journals",
    UPDATE: "/journals/:id",
    GET_BY_CLASS: "/journals/class/:id"
  },
  DISCIPLINE: {
    GET_ALL: "/discipline",
    GET_BY_ID: "/discipline/:id",
    CREATE: "/discipline",
    UPDATE: "/discipline/:id",
    GET_BY_STUDENT: "/discipline/student/:id"
  },
  PERMISSION: {
    GET_ALL: "/permissions",
    GET_BY_ID: "/permissions/:id",
    CREATE: "/permissions",
    UPDATE: "/permissions/:id",
    GET_BY_STUDENT: "/permissions/student/:id",
    APPROVE: "/permissions/:id/approve",
    REJECT: "/permissions/:id/reject"
  },
  EXTRACURRICULAR: {
    GET_ALL: "/extracurricular",
    GET_BY_ID: "/extracurricular/:id",
    CREATE: "/extracurricular",
    UPDATE: "/extracurricular/:id",
    GET_ATTENDANCE: "/extracurricular/:id/attendance",
    CREATE_ATTENDANCE: "/extracurricular/:id/attendance"
  },
  PROPOSAL: {
    GET_ALL: "/proposals",
    GET_BY_ID: "/proposals/:id",
    CREATE: "/proposals",
    UPDATE: "/proposals/:id",
    APPROVE: "/proposals/:id/approve",
    REJECT: "/proposals/:id/reject"
  }
};

// Status codes
export const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  COMPLETED: "completed",
  IN_PROGRESS: "in_progress"
};

// Notification types
export const NOTIFICATION_TYPES = {
  ATTENDANCE: "attendance",
  DISCIPLINE: "discipline",
  PERMISSION: "permission",
  COMPLAINT: "complaint",
  ANNOUNCEMENT: "announcement",
  COUNSELING: "counseling",
  JOURNAL: "journal",
  PROPOSAL: "proposal"
};

// Discipline points system
export const DISCIPLINE_POINTS = {
  MINOR_VIOLATION: -5,
  MEDIUM_VIOLATION: -10,
  MAJOR_VIOLATION: -20,
  ACHIEVEMENT: 15
};

// Counseling categories
export const COUNSELING_CATEGORIES = {
  ACADEMIC: "academic",
  PERSONAL: "personal",
  SOCIAL: "social",
  CAREER: "career",
  HEALTH: "health",
  FAMILY: "family",
  OTHER: "other"
};

// Journal types
export const JOURNAL_TYPES = {
  CLASS_MEETING: "meeting",
  ACADEMIC_EVALUATION: "academic",
  DISCIPLINE_COUNSELING: "discipline",
  EXTRACURRICULAR: "extracurricular",
  PARENT_MEETING: "parentMeeting",
  SPECIAL_HANDLING: "special",
  OTHER: "other"
};
