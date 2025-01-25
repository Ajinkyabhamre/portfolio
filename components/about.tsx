"use client";
import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
export default function About() {
  const { ref } = useSectionInView("About", 0.9);

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-m-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>

      <p className="mb-3">
        A passionate software engineer with hands-on experience in{" "}
        <span className="font-medium">full-stack development</span> and a{" "}
        <span className="font-medium">Master’s in Software Engineering</span>, I
        specialize in crafting impactful, scalable solutions. By mastering the{" "}
        <span className="font-medium">
          Software Development Lifecycle (SDLC)
        </span>{" "}
        through complex, real-world projects, I bring technical expertise in{" "}
        <span className="font-medium">MERN stack, TypeScript, and AWS</span>,
        combined with a{" "}
        <span className="font-medium">results-driven mindset</span>. Thriving in{" "}
        <span className="font-medium">collaborative environments</span>, I am
        committed to leveraging <span className="font-medium">innovation</span>{" "}
        to solve real-world challenges and deliver meaningful outcomes.
      </p>
    </motion.section>
  );
}
