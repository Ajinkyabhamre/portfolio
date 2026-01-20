import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  // Cap threshold at 0.4 on mobile for better responsiveness
  const mobileThreshold = typeof window !== 'undefined' && window.innerWidth < 768
    ? Math.min(threshold, 0.4)
    : threshold;

  const { ref, inView } = useInView({
    threshold: mobileThreshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}
