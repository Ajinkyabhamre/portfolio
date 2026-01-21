"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { projectsData } from "@/lib/data";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { isMobileViewport, prefersReducedMotion } from "@/lib/architecture-diagram-utils";

// Lazy load ArchitectureDiagram component
const ArchitectureDiagram = dynamic(() => import("./architecture-diagram"), {
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
  ),
});

type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
  featured,
  impact,
  architecture,
  architectureSimplified,
}: ProjectProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Detect mobile and reduced motion preferences
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileViewport());
    setReduceMotion(prefersReducedMotion());

    const handleResize = () => setIsMobile(isMobileViewport());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Choose diagram config based on viewport
  const diagramConfig = isMobile ? architectureSimplified : architecture;
  const showLabels = true;  // Always show labels, use responsive sizing instead
  const enableAnimations = !isMobile && !reduceMotion;  // Disable animations on mobile for better performance

  if (featured) {
    // Featured project - larger, hero-style layout
    return (
      <div
        ref={ref}
        className={`group mb-8 transition-all duration-700 ${
          inView ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
        }`}
      >
        {/* Gradient border wrapper */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-200/50 via-transparent to-pink-200/50 dark:from-purple-500/20 dark:via-transparent dark:to-pink-500/20 hover:-translate-y-0.5 transition-transform duration-300">
          <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.03] dark:border-white/[0.05] transition-all duration-300 shadow-sm hover:shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
            {/* Content */}
            <div className="flex flex-col justify-center space-y-4">
              {/* Featured Badge - Chip style in content flow */}
              <div className="flex items-center gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-purple-300/40 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-semibold w-fit">
                <HiSparkles className="w-3.5 h-3.5" />
                Featured Project
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
              {impact && (
                <p className="text-sm text-purple-600 dark:text-purple-400 italic border-l-4 border-purple-500 pl-4">
                  {impact}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full border border-black/5 dark:border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 h-11 bg-gradient-to-r from-[#dbd7fb] to-[#fbe2e3] dark:from-purple-500/40 dark:to-pink-500/40 text-gray-800 dark:text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <FaGlobe className="w-5 h-5" />
                  Live
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub repository for ${title}`}
                  className="flex items-center gap-2 px-6 h-11 bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/15 text-gray-700 dark:text-gray-200 rounded-xl font-semibold backdrop-blur-sm hover:border-purple-300 dark:hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  <FaGithub className="w-5 h-5" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="relative aspect-[16/10] flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_70%)]">
              <ArchitectureDiagram
                config={diagramConfig}
                showLabels={showLabels}
                enableAnimations={enableAnimations}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  // Regular project card - compact grid item
  return (
    <div
      ref={ref}
      className={`group h-full transition-all duration-700 ${
        inView ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
      }`}
    >
      {/* Gradient border wrapper */}
      <div className="h-full p-[1px] rounded-xl bg-gradient-to-br from-purple-200/40 via-transparent to-pink-200/40 dark:from-purple-500/15 dark:via-transparent dark:to-pink-500/15 hover:-translate-y-0.5 transition-transform duration-300">
        <div className="h-full bg-white/70 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-black/[0.03] dark:border-white/[0.05] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col">
        {/* Architecture Diagram */}
        <div className="relative aspect-[16/9] overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_70%)] p-4">
          <ArchitectureDiagram
            config={diagramConfig}
            showLabels={showLabels}
            enableAnimations={enableAnimations}
            className="w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-snug">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 flex-grow">
            {description}
          </p>

          {impact && (
            <p className="text-xs text-purple-600 dark:text-purple-400 italic mb-4 border-l-2 border-purple-500 pl-3">
              {impact}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-full border border-black/5 dark:border-white/10"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                +{tags.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${title}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 h-10 bg-gradient-to-r from-[#dbd7fb] to-[#fbe2e3] dark:from-purple-500/40 dark:to-pink-500/40 text-gray-800 dark:text-white text-sm rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <FaGlobe className="w-4 h-4" />
              Live
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${title}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 h-10 bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/15 text-gray-700 dark:text-gray-200 text-sm rounded-xl font-semibold backdrop-blur-sm hover:border-purple-300 dark:hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
