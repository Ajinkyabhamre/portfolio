/**
 * Utility functions for architecture diagram rendering and animations
 */

export interface Point {
  x: number;
  y: number;
}

/**
 * Calculate a point along an SVG path at a given progress (0-1)
 * Uses getTotalLength() and getPointAtLength() for accurate positioning
 */
export function getPointAlongPath(
  pathElement: SVGPathElement | null,
  progress: number
): Point | null {
  if (!pathElement) return null;

  try {
    const pathLength = pathElement.getTotalLength();
    const distance = pathLength * progress;
    const point = pathElement.getPointAtLength(distance);

    return { x: point.x, y: point.y };
  } catch (error) {
    console.error('Error calculating point along path:', error);
    return null;
  }
}

/**
 * Calculate a smooth quadratic Bezier curve path between two points
 * Creates a natural arc for connection lines
 */
export function calculatePath(
  from: Point,
  to: Point,
  viewBoxWidth: number,
  viewBoxHeight: number
): string {
  // Calculate control point for curve
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  // Control point offset based on distance
  const controlX = from.x + dx / 2;
  const controlY = from.y + dy / 2;

  // Add perpendicular offset for curvature
  const perpX = -dy * 0.15;
  const perpY = dx * 0.15;

  const cp1x = controlX + perpX;
  const cp1y = controlY + perpY;

  return `M ${from.x} ${from.y} Q ${cp1x} ${cp1y} ${to.x} ${to.y}`;
}

/**
 * Get color scheme for node based on type and theme
 */
export function getNodeColors(
  type: 'frontend' | 'backend' | 'database' | 'service' | 'infra',
  isDark: boolean
): {
  fill: string;
  stroke: string;
  text: string;
} {
  const colorSchemes = {
    frontend: {
      light: {
        fill: '#e0f2fe', // sky-100
        stroke: '#0ea5e9', // sky-500
        text: '#0c4a6e', // sky-900
      },
      dark: {
        fill: '#0c4a6e', // sky-900
        stroke: '#38bdf8', // sky-400
        text: '#e0f2fe', // sky-100
      },
    },
    backend: {
      light: {
        fill: '#f3e8ff', // purple-100
        stroke: '#a855f7', // purple-500
        text: '#581c87', // purple-900
      },
      dark: {
        fill: '#581c87', // purple-900
        stroke: '#c084fc', // purple-400
        text: '#f3e8ff', // purple-100
      },
    },
    database: {
      light: {
        fill: '#fce7f3', // pink-100
        stroke: '#ec4899', // pink-500
        text: '#831843', // pink-900
      },
      dark: {
        fill: '#831843', // pink-900
        stroke: '#f472b6', // pink-400
        text: '#fce7f3', // pink-100
      },
    },
    service: {
      light: {
        fill: '#ddd6fe', // violet-200
        stroke: '#8b5cf6', // violet-500
        text: '#4c1d95', // violet-900
      },
      dark: {
        fill: '#4c1d95', // violet-900
        stroke: '#a78bfa', // violet-400
        text: '#ddd6fe', // violet-200
      },
    },
    infra: {
      light: {
        fill: '#f1f5f9', // slate-100
        stroke: '#64748b', // slate-500
        text: '#1e293b', // slate-800
      },
      dark: {
        fill: '#1e293b', // slate-800
        stroke: '#94a3b8', // slate-400
        text: '#f1f5f9', // slate-100
      },
    },
  };

  const scheme = colorSchemes[type];
  return isDark ? scheme.dark : scheme.light;
}

/**
 * Convert percentage-based position (0-100) to viewBox coordinates
 */
export function percentToCoords(
  percentX: number,
  percentY: number,
  viewBoxWidth: number,
  viewBoxHeight: number
): Point {
  return {
    x: (percentX / 100) * viewBoxWidth,
    y: (percentY / 100) * viewBoxHeight,
  };
}

/**
 * Calculate optimal text position within a node
 */
export function calculateTextPosition(
  nodeX: number,
  nodeY: number,
  nodeWidth: number,
  nodeHeight: number
): Point {
  return {
    x: nodeX + nodeWidth / 2,
    y: nodeY + nodeHeight / 2,
  };
}

/**
 * Generate unique key for edge identification
 */
export function getEdgeKey(fromId: string, toId: string): string {
  return `${fromId}->${toId}`;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if viewport is mobile size
 */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768; // md breakpoint
}
