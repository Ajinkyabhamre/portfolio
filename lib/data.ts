import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import jobTracker from "@/public/jobtracker.jpeg";
import epicarehub from "@/public/epicarehub.jpeg";
import reasearch_platform from "@/public/research.png";
//import holeDetection from "@/public/holeDetection.png";

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
      "I graduated with a Bachelor's degree in Information Technology from NMIMS University, India.",
    icon: React.createElement(LuGraduationCap),
    date: "2020",
  },
  {
    title: "Software Engineer",
    location: "Propix Technologies",
    description:
      "I worked as a full stack web developer for 3 years. I also upskilled to the full stack.",
    icon: React.createElement(CgWorkAlt),
    date: "2020 - 2023",
  },
  {
    title: "Stevens institute of technology",
    location: "MS in Software Engineering",
    description:
      "I am currently pursuing a Master's degree in Software Engineering from Stevens Institute of Technology, USA.",
    icon: React.createElement(LuGraduationCap),
    date: "2023 - Present",
  },
  {
    title: "Learning technology assistant",
    location: "Stevens institute of technology",
    description: "------",
    icon: React.createElement(CgWorkAlt),
    date: "2024 - Present",
  },
] as const;

export const projectsData = [
  {
    title: "Research Collaboration Platform",
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
  },

  {
    title: "Presurgical epilipsy detection Platform",
    description:
      "A web tool empowering users to identify seizure-affected brain areas through 3D visualization and ML-driven insights for improved surgical outcomes.",
    tags: ["React", "Node", "Python", "Mongodb", "Jest"],
    imageUrl: epicarehub,
  },
  {
    title: "Job Application Tracker",
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
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "Jest",
  "Framer Motion",
] as const;
