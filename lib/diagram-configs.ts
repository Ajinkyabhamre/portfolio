/**
 * Architecture diagram configurations for portfolio projects
 */

export interface DiagramNode {
  id: string;
  label: string;
  type: 'frontend' | 'backend' | 'database' | 'service' | 'infra';
  position: { x: number; y: number }; // percentage 0-100
  description?: string; // for tooltip
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string; // e.g., "HTTPS", "GraphQL", "WebSocket"
  animated?: boolean;
  bidirectional?: boolean;
}

export interface DiagramConfig {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

/**
 * EpiCareHub - Presurgical epilepsy detection platform
 * Architecture: React frontend, Node.js backend, FastAPI ML service, MongoDB
 */
export const epicarehubArchitecture: DiagramConfig = {
  nodes: [
    {
      id: 'frontend',
      label: 'React + Vite',
      type: 'frontend',
      position: { x: 15, y: 50 },
      description: 'Frontend deployed on Vercel',
    },
    {
      id: 'backend',
      label: 'Node.js + Express',
      type: 'backend',
      position: { x: 40, y: 35 },
      description: 'Backend API on Railway',
    },
    {
      id: 'ml',
      label: 'FastAPI ML',
      type: 'service',
      position: { x: 65, y: 50 },
      description: 'ML Service on Railway',
    },
    {
      id: 'mongo',
      label: 'MongoDB Atlas',
      type: 'database',
      position: { x: 40, y: 70 },
      description: 'Cloud database',
    },
    {
      id: '3d',
      label: 'Three.js',
      type: 'frontend',
      position: { x: 15, y: 25 },
      description: '3D visualization in browser',
    },
    {
      id: 'assets',
      label: 'Brain Mesh Assets',
      type: 'infra',
      position: { x: 15, y: 75 },
      description: 'Static mesh files',
    },
    {
      id: 'docker',
      label: 'Docker/GHCR',
      type: 'infra',
      position: { x: 85, y: 50 },
      description: 'Container registry',
    },
  ],
  edges: [
    { from: 'frontend', to: 'backend', label: 'HTTPS', animated: true },
    { from: 'backend', to: 'mongo', animated: false },
    { from: 'backend', to: 'ml', label: 'REST', animated: true, bidirectional: true },
    { from: 'frontend', to: '3d', animated: false },
    { from: 'frontend', to: 'assets', animated: false },
    { from: 'ml', to: 'docker', animated: false },
  ],
};

/**
 * Stevens Research - Research collaboration platform
 * Architecture: React frontend, Apollo GraphQL backend, MongoDB, Redis, Socket.IO
 */
export const stevensResearchArchitecture: DiagramConfig = {
  nodes: [
    {
      id: 'frontend',
      label: 'React + Vite',
      type: 'frontend',
      position: { x: 15, y: 50 },
      description: 'Frontend on Vercel',
    },
    {
      id: 'clerk',
      label: 'Clerk Auth',
      type: 'service',
      position: { x: 15, y: 20 },
      description: 'Authentication service',
    },
    {
      id: 'backend',
      label: 'Apollo GraphQL',
      type: 'backend',
      position: { x: 45, y: 50 },
      description: 'Express + Apollo on Railway',
    },
    {
      id: 'mongo',
      label: 'MongoDB Atlas',
      type: 'database',
      position: { x: 75, y: 40 },
      description: 'Primary database',
    },
    {
      id: 'redis',
      label: 'Redis',
      type: 'database',
      position: { x: 75, y: 70 },
      description: 'Cache on Railway',
    },
    {
      id: 'socket',
      label: 'Socket.IO',
      type: 'service',
      position: { x: 45, y: 20 },
      description: 'WebSocket server',
    },
  ],
  edges: [
    { from: 'frontend', to: 'clerk', label: 'OAuth', animated: false },
    { from: 'frontend', to: 'backend', label: 'GraphQL', animated: true },
    { from: 'frontend', to: 'socket', label: 'WS', animated: true, bidirectional: true },
    { from: 'backend', to: 'mongo', animated: false },
    { from: 'backend', to: 'redis', animated: false },
  ],
};

/**
 * Job Application Tracker - Job management application
 * Architecture: Vanilla JS frontend, Express SSR backend, MongoDB, Cloudinary
 */
export const jobTrackerArchitecture: DiagramConfig = {
  nodes: [
    {
      id: 'browser',
      label: 'Vanilla JS',
      type: 'frontend',
      position: { x: 20, y: 50 },
      description: 'Bootstrap UI',
    },
    {
      id: 'express',
      label: 'Express SSR',
      type: 'backend',
      position: { x: 50, y: 50 },
      description: 'MVC on Railway',
    },
    {
      id: 'mongo',
      label: 'MongoDB Atlas',
      type: 'database',
      position: { x: 80, y: 40 },
      description: 'Data storage',
    },
    {
      id: 'cloudinary',
      label: 'Cloudinary',
      type: 'service',
      position: { x: 80, y: 70 },
      description: 'File uploads',
    },
    {
      id: 'handlebars',
      label: 'Handlebars',
      type: 'backend',
      position: { x: 50, y: 25 },
      description: 'Template engine',
    },
  ],
  edges: [
    { from: 'browser', to: 'express', animated: true },
    { from: 'express', to: 'mongo', animated: false },
    { from: 'express', to: 'cloudinary', animated: false },
    { from: 'express', to: 'handlebars', animated: false },
  ],
};

/**
 * Simplified versions for mobile (fewer nodes, core architecture only)
 */
export const epicarehubArchitectureSimplified: DiagramConfig = {
  nodes: [
    {
      id: 'frontend',
      label: 'React',
      type: 'frontend',
      position: { x: 20, y: 50 },
    },
    {
      id: 'backend',
      label: 'Node.js',
      type: 'backend',
      position: { x: 50, y: 50 },
    },
    {
      id: 'ml',
      label: 'FastAPI',
      type: 'service',
      position: { x: 80, y: 50 },
    },
  ],
  edges: [
    { from: 'frontend', to: 'backend', animated: false },
    { from: 'backend', to: 'ml', animated: false },
  ],
};

export const stevensResearchArchitectureSimplified: DiagramConfig = {
  nodes: [
    {
      id: 'frontend',
      label: 'React',
      type: 'frontend',
      position: { x: 20, y: 50 },
    },
    {
      id: 'backend',
      label: 'GraphQL',
      type: 'backend',
      position: { x: 50, y: 50 },
    },
    {
      id: 'mongo',
      label: 'MongoDB',
      type: 'database',
      position: { x: 80, y: 50 },
    },
  ],
  edges: [
    { from: 'frontend', to: 'backend', animated: false },
    { from: 'backend', to: 'mongo', animated: false },
  ],
};

export const jobTrackerArchitectureSimplified: DiagramConfig = {
  nodes: [
    {
      id: 'browser',
      label: 'Browser',
      type: 'frontend',
      position: { x: 25, y: 50 },
    },
    {
      id: 'express',
      label: 'Express',
      type: 'backend',
      position: { x: 75, y: 50 },
    },
  ],
  edges: [
    { from: 'browser', to: 'express', animated: false },
  ],
};
