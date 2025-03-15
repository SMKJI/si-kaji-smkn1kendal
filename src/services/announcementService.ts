
import { Announcement } from '@/lib/types/announcement';

// In a real app, this would be stored in a database
let announcements: Announcement[] = [
  {
    id: 1,
    title: 'Pengumuman Pendaftaran Ekstrakurikuler',
    content: 'Pendaftaran ekstrakurikuler untuk semester baru telah dibuka. Silakan mendaftar melalui sistem Si-Kaji sebelum tanggal 15 September 2023.',
    date: '2023-09-01',
    important: true,
  },
  {
    id: 2,
    title: 'Jadwal Ujian Tengah Semester',
    content: 'Ujian Tengah Semester akan dilaksanakan pada tanggal 10-15 Oktober 2023. Siswa wajib hadir tepat waktu dan membawa perlengkapan yang diperlukan.',
    date: '2023-09-15',
    important: false,
  },
  {
    id: 3,
    title: 'Pemeliharaan Sistem',
    content: 'Sistem Si-Kaji akan mengalami pemeliharaan pada tanggal 20 September 2023 dari pukul 22:00 - 02:00 WIB. Mohon maaf atas ketidaknyamanan ini.',
    date: '2023-09-18',
    important: true,
  },
];

export const getAnnouncements = (): Announcement[] => {
  return [...announcements];
};

export const getAnnouncementById = (id: number): Announcement | undefined => {
  return announcements.find(announcement => announcement.id === id);
};

export const createAnnouncement = (announcement: Omit<Announcement, 'id' | 'date'>): Announcement => {
  const newAnnouncement: Announcement = {
    ...announcement,
    id: announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1,
    date: new Date().toISOString().split('T')[0],
  };
  
  announcements = [...announcements, newAnnouncement];
  return newAnnouncement;
};

export const updateAnnouncement = (id: number, updateData: Partial<Omit<Announcement, 'id'>>): Announcement | null => {
  const index = announcements.findIndex(announcement => announcement.id === id);
  
  if (index === -1) {
    return null;
  }
  
  const updatedAnnouncement = { ...announcements[index], ...updateData };
  announcements = [
    ...announcements.slice(0, index),
    updatedAnnouncement,
    ...announcements.slice(index + 1)
  ];
  
  return updatedAnnouncement;
};

export const deleteAnnouncement = (id: number): boolean => {
  const index = announcements.findIndex(announcement => announcement.id === id);
  
  if (index === -1) {
    return false;
  }
  
  announcements = [
    ...announcements.slice(0, index),
    ...announcements.slice(index + 1)
  ];
  
  return true;
};
