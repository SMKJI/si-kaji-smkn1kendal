
/**
 * API endpoint constants
 */

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
  },
  REPORTS: {
    GET_ATTENDANCE: "/reports/attendance",
    GET_DISCIPLINE: "/reports/discipline",
    GET_COUNSELING: "/reports/counseling",
    GET_SUMMARY: "/reports/summary",
    EXPORT_ATTENDANCE: "/reports/attendance/export",
    EXPORT_DISCIPLINE: "/reports/discipline/export",
    EXPORT_COUNSELING: "/reports/counseling/export",
    EXPORT_SUMMARY: "/reports/summary/export"
  }
};
