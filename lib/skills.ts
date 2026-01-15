export type SkillLevel = "primary" | "secondary" | "familiar";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    icon: "code",
    skills: [
      { name: "JavaScript", level: "primary" },
      { name: "TypeScript", level: "primary" },
      { name: "Python", level: "primary" },
      { name: "Java", level: "primary" },
      { name: "Go", level: "secondary" },
      { name: "Bash", level: "secondary" },
      { name: "C/C++", level: "familiar" },
      { name: "PHP", level: "familiar" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", level: "primary" },
      { name: "Next.js", level: "primary" },
      { name: "Tailwind", level: "primary" },
      { name: "HTML", level: "secondary" },
      { name: "CSS", level: "secondary" },
      { name: "Redux", level: "secondary" },
      { name: "Angular", level: "familiar" },
      { name: "React Native", level: "familiar" },
      { name: "jQuery", level: "familiar" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: "server",
    skills: [
      { name: "Node.js", level: "primary" },
      { name: "Express", level: "primary" },
      { name: "GraphQL", level: "primary" },
      { name: "REST APIs", level: "secondary" },
      { name: "WebSockets", level: "secondary" },
      { name: "gRPC", level: "familiar" },
      { name: "Flask", level: "familiar" },
      { name: "FastAPI", level: "familiar" },
      { name: "Spring Boot", level: "familiar" },
      { name: "ASP.NET MVC", level: "familiar" },
      { name: "OAuth/JWT", level: "familiar" },
    ],
  },
  {
    id: "databases",
    title: "Databases & Caching",
    icon: "database",
    skills: [
      { name: "MongoDB", level: "primary" },
      { name: "PostgreSQL", level: "secondary" },
      { name: "Redis", level: "secondary" },
      { name: "Firebase", level: "familiar" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      { name: "AWS", level: "primary" },
      { name: "Docker", level: "primary" },
      { name: "Git", level: "primary" },
      { name: "GitHub Actions", level: "secondary" },
      { name: "Linux", level: "secondary" },
      { name: "GCP", level: "familiar" },
      { name: "Azure", level: "familiar" },
      { name: "Kubernetes", level: "familiar" },
      { name: "Terraform", level: "familiar" },
      { name: "Jenkins", level: "familiar" },
      { name: "Jira", level: "familiar" },
    ],
  },
  {
    id: "testing",
    title: "Testing & Quality",
    icon: "check",
    skills: [
      { name: "Jest", level: "primary" },
      { name: "React Testing Library", level: "secondary" },
      { name: "TDD", level: "familiar" },
    ],
  },
  {
    id: "ai",
    title: "AI Tools",
    icon: "sparkles",
    skills: [
      { name: "GitHub Copilot", level: "primary" },
      { name: "Cursor", level: "primary" },
      { name: "Claude Code", level: "primary" },
      { name: "Prompt Engineering", level: "familiar" },
    ],
  },
  {
    id: "practices",
    title: "Practices",
    icon: "workflow",
    skills: [
      { name: "Problem Solving", level: "primary" },
      { name: "Debugging", level: "primary" },
      { name: "Code Review", level: "primary" },
      { name: "Technical Writing", level: "secondary" },
      { name: "Agile/Scrum", level: "secondary" },
      { name: "Version Control", level: "secondary" },
    ],
  },
];
