export type EntryType = "work" | "education";

export interface ExperienceItem {
  id: string;
  type: EntryType;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  techStack?: string[];
  maxBullets?: number; // Explicit override for bullet count
}

export const experienceData: ExperienceItem[] = [
  // Most recent first (by endDate)
  {
    id: "uplifty",
    type: "work",
    title: "Software Engineer Intern",
    organization: "Uplifty AI",
    location: "New York, NY",
    startDate: "Aug 2025",
    endDate: "Present",
    maxBullets: 2,
    bullets: [
      "Built cross-platform UI components with React Native and TypeScript, improving load time and feature usability by 25%.",
      "Automated mobile releases through GitHub Actions, cutting deployment effort 40% and improving release reliability.",
    ],
    techStack: ["React Native", "TypeScript", "GitHub Actions"],
  },
  {
    id: "stevens-ms",
    type: "education",
    title: "MS in Software Engineering",
    organization: "Stevens Institute of Technology",
    location: "Hoboken, NJ",
    startDate: "2023",
    endDate: "Present",
    maxBullets: 1,
    bullets: [
      "Pursuing a Master's degree in Software Engineering, gaining expertise in full-stack development, cloud technologies, and agile methodologies.",
    ],
  },
  {
    id: "stevens-it",
    type: "work",
    title: "Graduate IT Assistant",
    organization: "Stevens Institute of Technology",
    location: "Hoboken, NJ",
    startDate: "Aug 2024",
    endDate: "May 2025",
    maxBullets: 2,
    bullets: [
      "Provided technical support by diagnosing and resolving issues with Audio/Visual equipment, networking, and LAN/TCP/IP systems.",
      "Ensured seamless operations across campus facilities through proactive maintenance and troubleshooting.",
    ],
    techStack: ["A/V Equipment", "Networking", "LAN/TCP/IP"],
  },
  {
    id: "propix",
    type: "work",
    title: "Software Engineer",
    organization: "Propix Technologies",
    location: "Pune, India",
    startDate: "Aug 2020",
    endDate: "Jul 2023",
    bullets: [
      "Developed and maintained scalable web applications serving enterprise clients.",
      "Mastered the full software development lifecycle from requirements to deployment.",
      "Collaborated with cross-functional teams in an Agile environment.",
    ],
  },
  {
    id: "nmims",
    type: "education",
    title: "BTech in Information Technology",
    organization: "NMIMS University",
    location: "Mumbai, India",
    startDate: "2016",
    endDate: "2020",
    maxBullets: 1,
    bullets: [
      "Graduated with a Bachelor's degree in Information Technology, building a strong foundation in programming, data structures, and software development.",
    ],
  },
];

// Helper to parse date strings like "Aug 2025", "2023", "Present"
export function parseExperienceDate(dateStr: string): Date {
  if (dateStr === "Present") {
    return new Date();
  }

  // Handle "Aug 2025" format
  const monthYearMatch = dateStr.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const monthNames: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const month = monthNames[monthYearMatch[1]] ?? 0;
    const year = parseInt(monthYearMatch[2], 10);
    return new Date(year, month, 1);
  }

  // Handle "2023" format (year only)
  const yearMatch = dateStr.match(/^(\d{4})$/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1], 10), 0, 1);
  }

  return new Date();
}

// Calculate duration in months
export function calculateDurationMonths(startDate: string, endDate: string): number {
  const start = parseExperienceDate(startDate);
  const end = parseExperienceDate(endDate);
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return Math.max(1, months);
}

// Get bullet limit based on duration
export function getDurationBasedBulletLimit(months: number): number {
  if (months >= 24) return 3;
  if (months >= 10) return 2;
  return 1;
}
