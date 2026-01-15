import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import jobTracker from "@/public/jobtracker.webp";
import epicarehub from "@/public/epicarehub.webp";
import reasearch_platform from "@/public/research.webp";
import {
  epicarehubArchitecture,
  epicarehubArchitectureSimplified,
  stevensResearchArchitecture,
  stevensResearchArchitectureSimplified,
  jobTrackerArchitecture,
  jobTrackerArchitectureSimplified,
} from "./diagram-configs";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "NMIMS University",
    location: "BTech in Information Technology",
    description:
      "Graduated with a Bachelor's degree in Information Technology, building a strong foundation in programming, data structures, and software development.",
    icon: React.createElement(LuGraduationCap),
    date: "2020",
  },
  {
    title: "Software Engineer",
    location: "Propix Technologies",
    description:
      "Worked as a full-stack developer for 3 years, delivering scalable web applications while mastering the full software development lifecycle.",
    icon: React.createElement(CgWorkAlt),
    date: "2020 - 2023",
  },
  {
    title: "Stevens institute of technology",
    location: "MS in Software Engineering",
    description:
      "Currently pursuing a Master's degree in Software Engineering, gaining expertise in full-stack development, cloud technologies, and agile methodologies.",
    icon: React.createElement(LuGraduationCap),
    date: "2023 - Present",
  },
  {
    title: "Learning technology assistant",
    location: "Stevens institute of technology",
    description:
      "Provide technical support by diagnosing and resolving issues with Audio/Visual equipment, networking, and LAN/TCP/IP systems while ensuring seamless operations.",
    icon: React.createElement(CgWorkAlt),
    date: "2024 - Present",
  },
] as const;

export const projectsData = [
  {
    title: "Presurgical epilepsy detection platform",
    description:
      "A web tool empowering users to identify seizure-affected brain areas through 3D visualization and ML-driven insights for improved surgical outcomes.",
    tags: ["React", "Node", "Python", "Mongodb", "Jest"],
    imageUrl: epicarehub,
    githubUrl: "https://github.com/Ajinkyabhamre/SSWCS-555-EpiCareHub",
    liveUrl: "https://epicarehub-frontend.vercel.app/",
    featured: true,
    impact: "Helping neurosurgeons make data-driven decisions for epilepsy treatment",
    architecture: epicarehubArchitecture,
    architectureSimplified: epicarehubArchitectureSimplified,
  },
  {
    title: "Stevens research",
    description:
      "A web-based platform enabling professors, students, and researchers to create, manage, and collaborate on research projects seamlessly.",
    tags: [
      "ReactJS",
      "GraphQL",
      "MongoDB",
      "Redis",
      "Firebase Authentication",
      "Git",
    ],
    imageUrl: reasearch_platform,
    githubUrl: "https://github.com/Ajinkyabhamre/research-collaboration-platform",
    liveUrl: "https://research-collaboration-platform-three.vercel.app/",
    featured: false,
    impact: "Streamlining academic collaboration across campus",
    architecture: stevensResearchArchitecture,
    architectureSimplified: stevensResearchArchitectureSimplified,
  },
  {
    title: "Job application tracker",
    description:
      "A full-stack application to simplify job management with secure uploads, real-time visualizations, and location-based insights.",
    tags: [
      "JavaScript",
      "Bootstrap",
      "MongoDB",
      "NodeJS",
      "Cloudinary",
      "Leaflet",
      "Git",
    ],
    imageUrl: jobTracker,
    githubUrl: "https://github.com/Ajinkyabhamre/Job-Application-Tracker",
    liveUrl: "https://job-tracker-production-5de4.up.railway.app/",
    featured: false,
    impact: "Simplifying job search with visual insights and organization",
    architecture: jobTrackerArchitecture,
    architectureSimplified: jobTrackerArchitectureSimplified,
  },
] as const;
