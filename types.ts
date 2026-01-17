export interface ChapterData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  image?: string;
  stats?: { label: string; value: string }[];
  colorTheme: 'red' | 'blue' | 'purple' | 'grey';
}

export interface Quote {
  text: string;
  context: string;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}
