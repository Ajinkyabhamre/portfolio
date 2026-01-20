"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { skillCategories, SkillCategory, Skill } from "@/lib/skills";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import {
  HiCode,
  HiTemplate,
  HiServer,
  HiDatabase,
  HiCloud,
  HiCheckCircle,
  HiSparkles,
  HiCog,
} from "react-icons/hi";

const iconMap: Record<string, React.ElementType> = {
  code: HiCode,
  layout: HiTemplate,
  server: HiServer,
  database: HiDatabase,
  cloud: HiCloud,
  check: HiCheckCircle,
  sparkles: HiSparkles,
  workflow: HiCog,
};

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// Removed pill animations for better performance - animate only cards
function SkillPill({ skill }: { skill: Skill }) {
  const levelStyles: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20 text-gray-800 dark:text-white border-purple-200/50 dark:border-purple-500/30",
    secondary:
      "bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-black/5 dark:border-white/10",
    familiar:
      "bg-white/40 dark:bg-white/[0.03] text-gray-500 dark:text-gray-400 border-black/[0.03] dark:border-white/[0.05] text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-medium transition-all duration-200 hover:scale-[1.02] ${levelStyles[skill.level]}`}
    >
      {skill.level === "primary" && (
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
      )}
      {skill.name}
    </span>
  );
}

function SkillCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[category.icon] || HiCode;
  const VISIBLE_LIMIT = 8;
  const needsExpand = category.skills.length > 10;
  const visibleSkills = needsExpand && !isExpanded
    ? category.skills.slice(0, VISIBLE_LIMIT)
    : category.skills;
  const hiddenCount = category.skills.length - VISIBLE_LIMIT;

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
      className="group"
    >
      {/* Gradient border wrapper */}
      <div className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-200/40 via-transparent to-pink-200/40 dark:from-purple-500/15 dark:via-transparent dark:to-pink-500/15">
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-black/[0.03] dark:border-white/[0.05] p-5 h-full transition-all duration-300 shadow-sm hover:shadow-md">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20">
              <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {category.title}
              </h3>
            </div>
          </div>

          {/* Skills pills */}
          <div className="flex flex-wrap gap-2">
            {visibleSkills.map((skill) => (
              <SkillPill key={skill.name} skill={skill} />
            ))}
            {needsExpand && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-200/50 dark:border-purple-500/20 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors"
              >
                +{hiddenCount} more
              </button>
            )}
            {needsExpand && isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                Show less
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[64rem] scroll-mt-28 sm:mb-40 px-4"
    >
      <SectionHeading>My skills</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((category, index) => (
          <SkillCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}
