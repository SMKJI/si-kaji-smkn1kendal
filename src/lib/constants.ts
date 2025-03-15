
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
  COUNSELING: "/counseling",
  PERMISSION: "/permission",
  STUDENT_DATA: "/student-data",
  STUDENT_ACTIVITIES: "/student-activities",
  CALENDAR: "/calendar",
  ANNOUNCEMENT: "/announcement",
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
  JOURNAL: "Jurnal perwalian digital untuk wali kelas"
};

// API endpoints (for future use)
export const API = {
  BASE_URL: "/api",
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password"
  }
};
