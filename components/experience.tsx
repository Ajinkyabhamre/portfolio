"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  experienceData,
  ExperienceItem,
  calculateDurationMonths,
  getDurationBasedBulletLimit,
} from "@/lib/experience";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi";

// Highlight metrics (percentages) in bullet text
function formatBullet(text: string): React.ReactNode {
  const parts = text.split(/(\d+%)/g);
  return parts.map((part, i) =>
    /^\d+%$/.test(part) ? (
      <strong key={i} className="font-semibold text-gray-900 dark:text-white">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// Get bullet limit for an entry (explicit override or duration-based)
function getBulletLimit(item: ExperienceItem): number {
  if (item.maxBullets !== undefined) {
    return item.maxBullets;
  }
  const months = calculateDurationMonths(item.startDate, item.endDate);
  return getDurationBasedBulletLimit(months);
}

// Timeline card component with glass styling
function TimelineCard({
  item,
  position,
}: {
  item: ExperienceItem;
  position: "left" | "right";
}) {
  const bulletLimit = getBulletLimit(item);
  const visibleBullets = item.bullets.slice(0, bulletLimit);

  return (
    <div className="w-full max-w-[500px] relative">
      {/* Arrow pointer to dot */}
      <div
        className={`absolute top-6 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent hidden lg:block ${
          position === "left"
            ? "right-[-7px] border-l-[7px] border-l-white/70 dark:border-l-gray-900/80"
            : "left-[-7px] border-r-[7px] border-r-white/70 dark:border-r-gray-900/80"
        }`}
      />

      {/* Date (desktop only, positioned outside card) */}
      <div
        className={`hidden lg:block absolute -top-8 text-sm text-gray-600 dark:text-gray-400 font-medium ${
          position === "left" ? "right-0" : "left-0"
        }`}
      >
        {item.startDate} – {item.endDate}
      </div>

      {/* Glass card wrapper */}
      <div className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-200/40 via-transparent to-pink-200/40 dark:from-purple-500/15 dark:via-transparent dark:to-pink-500/15">
        <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-black/5 dark:border-white/10 p-4 sm:p-5 transition-all duration-300 shadow-sm hover:shadow-md">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-0.5">
              {item.organization} · {item.location}
            </p>
          </div>

          {/* Bullets */}
          <ul className="space-y-2">
            {visibleBullets.map((bullet, bulletIndex) => (
              <li
                key={bulletIndex}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 dark:bg-purple-500 mt-[0.45rem] shrink-0" />
                <span className="leading-relaxed">{formatBullet(bullet)}</span>
              </li>
            ))}
          </ul>

          {/* Tech Stack pills */}
          {item.techStack && item.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 mt-3 border-t border-black/5 dark:border-white/5">
              {item.techStack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2.5 py-1 text-xs font-medium bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full border border-black/5 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Date (mobile only, below card) */}
          <div className="lg:hidden mt-3 pt-3 border-t border-black/5 dark:border-white/5 text-sm text-gray-600 dark:text-gray-400 font-medium">
            {item.startDate} – {item.endDate}
          </div>
        </div>
      </div>
    </div>
  );
}

// Timeline item with icon
function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
}) {
  const { theme } = useTheme();
  const isEducation = item.type === "education";
  const Icon = isEducation ? HiAcademicCap : HiBriefcase;
  const isLeft = index % 2 === 0;

  return (
    <div className="grid lg:grid-cols-[1fr_auto_1fr] grid-cols-[auto_1fr] gap-4 lg:gap-8 relative">
      {/* Desktop: Left card (even indices) */}
      {isLeft && (
        <div className="hidden lg:flex lg:justify-end lg:items-start">
          <TimelineCard item={item} position="left" />
        </div>
      )}

      {/* Desktop: Empty cell for odd indices (right-side cards) */}
      {!isLeft && <div className="hidden lg:block" />}

      {/* Spine column - always present */}
      <div className="flex flex-col items-center relative w-[44px]">
        {/* Vertical line - extends below icon */}
        {!isLast && (
          <div className="absolute top-[44px] bottom-[-16px] w-[2px] bg-black/8 dark:bg-white/10 left-1/2 -translate-x-1/2" />
        )}

        {/* Icon dot - centered on spine */}
        <div
          className="relative z-10 w-[40px] h-[40px] lg:w-[44px] lg:h-[44px] rounded-full flex items-center justify-center shadow-sm"
          style={{
            background:
              theme === "light"
                ? "linear-gradient(135deg, #f3e8ff, #fce7f3)"
                : "rgba(168, 85, 247, 0.2)",
            border:
              theme === "light"
                ? "2px solid rgba(168, 85, 247, 0.3)"
                : "2px solid rgba(168, 85, 247, 0.4)",
            color: theme === "light" ? "#9333ea" : "#c084fc",
          }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Right side: Card for odd indices on desktop, all cards on mobile */}
      <div
        className={`flex items-start ${
          isLeft ? "lg:hidden" : "lg:justify-start"
        }`}
      >
        <TimelineCard item={item} position={isLeft ? "right" : "left"} />
      </div>
    </div>
  );
}

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <div className="mt-8 space-y-0">
        {experienceData.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === experienceData.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
