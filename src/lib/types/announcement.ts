
export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export type CreateAnnouncementRequest = Omit<Announcement, "id" | "date">;
export type UpdateAnnouncementRequest = Partial<CreateAnnouncementRequest>;
