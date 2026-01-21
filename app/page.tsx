import dynamic from "next/dynamic";
import About from "@/components/about";
import Intro from "@/components/intro";
import SectionDivider from "@/components/section-divider";

// Lazy load below-fold components with responsive placeholder heights
const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => <div className="h-[400px] sm:h-[800px]" />,
});

const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => <div className="h-[300px] sm:h-[600px]" />,
});

const Experience = dynamic(() => import("@/components/experience"), {
  loading: () => <div className="h-[400px] sm:h-[800px]" />,
});

const Contact = dynamic(() => import("@/components/contact"), {
  loading: () => <div className="h-[350px] sm:h-[500px]" />,
});

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}