export type ScheduleEntry = {
  category: string;
  days: string[];
  time: string;
  location: string;
};

export const schedule: ScheduleEntry[] = [
  { category: "Sub-7",  days: ["Mar", "Jue"],          time: "16:00 - 17:30", location: "Cancha A" },
  { category: "Sub-9",  days: ["Lun", "Mié", "Vie"],   time: "16:00 - 17:30", location: "Cancha A" },
  { category: "Sub-11", days: ["Lun", "Mié", "Vie"],   time: "16:30 - 18:00", location: "Cancha B" },
  { category: "Sub-13", days: ["Mar", "Jue", "Sáb"],   time: "16:30 - 18:00", location: "Cancha B" },
  { category: "Sub-15", days: ["Lun", "Mar", "Mié", "Jue"], time: "17:00 - 19:00", location: "Cancha Principal" },
  { category: "Sub-17", days: ["Lun", "Mar", "Mié", "Jue"], time: "17:30 - 19:30", location: "Cancha Principal" },
];