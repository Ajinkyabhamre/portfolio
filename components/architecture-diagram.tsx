"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useTheme } from "@/context/theme-context";
import {
  getPointAlongPath,
  calculatePath,
  getNodeColors,
  percentToCoords,
  getEdgeKey,
  prefersReducedMotion,
} from "@/lib/architecture-diagram-utils";
import type { DiagramConfig, DiagramNode, DiagramEdge } from "@/lib/diagram-configs";

interface ArchitectureDiagramProps {
  config: DiagramConfig;
  className?: string;
  showLabels?: boolean;
  enableAnimations?: boolean;
}

const NODE_WIDTH = 80;
const NODE_HEIGHT = 35;
const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 400;

export default function ArchitectureDiagram({
  config,
  className = "",
  showLabels = true,
  enableAnimations = true,
}: ArchitectureDiagramProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const pathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const shouldAnimate = enableAnimations && !prefersReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {/* Header - Top-left chip */}
      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-full border border-black/5 dark:border-white/10">
        System Architecture
      </div>

      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Render edges first (so they appear behind nodes) */}
        {config.edges.map((edge) => {
          const fromNode = config.nodes.find((n) => n.id === edge.from);
          const toNode = config.nodes.find((n) => n.id === edge.to);

          if (!fromNode || !toNode) return null;

          const fromCoords = percentToCoords(
            fromNode.position.x,
            fromNode.position.y,
            VIEWBOX_WIDTH,
            VIEWBOX_HEIGHT
          );
          const toCoords = percentToCoords(
            toNode.position.x,
            toNode.position.y,
            VIEWBOX_WIDTH,
            VIEWBOX_HEIGHT
          );

          // Adjust start/end points to node edges
          const fromPoint = {
            x: fromCoords.x + NODE_WIDTH / 2,
            y: fromCoords.y + NODE_HEIGHT / 2,
          };
          const toPoint = {
            x: toCoords.x + NODE_WIDTH / 2,
            y: toCoords.y + NODE_HEIGHT / 2,
          };

          const pathD = calculatePath(fromPoint, toPoint, VIEWBOX_WIDTH, VIEWBOX_HEIGHT);
          const edgeKey = getEdgeKey(edge.from, edge.to);

          return (
            <g key={edgeKey}>
              {/* Main edge path */}
              <path
                ref={(el) => {
                  if (el) pathRefs.current.set(edgeKey, el);
                }}
                d={pathD}
                stroke={isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}
                strokeWidth="2"
                fill="none"
                strokeDasharray={edge.animated && shouldAnimate ? "5,5" : undefined}
              />

              {/* Edge label */}
              {showLabels && edge.label && (
                <text
                  x={(fromPoint.x + toPoint.x) / 2}
                  y={(fromPoint.y + toPoint.y) / 2 - 8}
                  className="text-[10px] fill-gray-500 dark:fill-gray-400"
                  textAnchor="middle"
                >
                  {edge.label}
                </text>
              )}

              {/* Animated packet dot */}
              {edge.animated && shouldAnimate && (
                <AnimatedPacket
                  pathRef={pathRefs.current.get(edgeKey) || null}
                  isDark={isDark}
                />
              )}

              {/* Bidirectional arrow indicator */}
              {edge.bidirectional && (
                <text
                  x={(fromPoint.x + toPoint.x) / 2}
                  y={(fromPoint.y + toPoint.y) / 2 + 15}
                  className="text-[8px] fill-gray-400 dark:fill-gray-500"
                  textAnchor="middle"
                >
                  ⇄
                </text>
              )}
            </g>
          );
        })}

        {/* Render nodes */}
        {config.nodes.map((node) => {
          const coords = percentToCoords(
            node.position.x,
            node.position.y,
            VIEWBOX_WIDTH,
            VIEWBOX_HEIGHT
          );
          const colors = getNodeColors(node.type, isDark);
          const isHovered = hoveredNode === node.id;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: node.description ? "pointer" : "default" }}
            >
              {/* Node rectangle */}
              <rect
                x={coords.x}
                y={coords.y}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx="8"
                fill={colors.fill}
                stroke={colors.stroke}
                strokeWidth={isHovered ? "3" : "2"}
                className="transition-all duration-200"
              />

              {/* Node label */}
              {showLabels && (
                <text
                  x={coords.x + NODE_WIDTH / 2}
                  y={coords.y + NODE_HEIGHT / 2}
                  className="text-[10px] font-medium"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={colors.text}
                >
                  {node.label}
                </text>
              )}

              {/* Tooltip on hover */}
              {isHovered && node.description && (
                <foreignObject
                  x={coords.x - 20}
                  y={coords.y - 50}
                  width="120"
                  height="40"
                >
                  <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[10px] px-2 py-1 rounded shadow-lg text-center">
                    {node.description}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Animated packet component that travels along an edge path
 */
function AnimatedPacket({
  pathRef,
  isDark,
}: {
  pathRef: SVGPathElement | null;
  isDark: boolean;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!pathRef) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 3000; // 3 seconds for full path traversal

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration; // 0 to 1, looping

      const point = getPointAlongPath(pathRef, progress);
      if (point) {
        setPosition(point);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [pathRef]);

  return (
    <motion.circle
      cx={position.x}
      cy={position.y}
      r="4"
      className={isDark ? "fill-purple-400" : "fill-purple-500"}
      animate={{
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 0.9, 1],
      }}
    />
  );
}
