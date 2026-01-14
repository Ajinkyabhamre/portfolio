"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  // Separate featured and regular projects
  const featuredProjects = projectsData.filter((project) => project.featured);
  const regularProjects = projectsData.filter((project) => !project.featured);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My projects</SectionHeading>

      <div className="max-w-[1200px] mx-auto">
        {/* Featured Projects */}
        {featuredProjects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}

        {/* Regular Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {regularProjects.map((project, index) => (
            <React.Fragment key={index}>
              <Project {...project} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
