import React, { useEffect, useRef } from 'react';
import { Particle } from '../../types';

interface CrowParticlesProps {
  density?: number;
}

const CrowParticles: React.FC<CrowParticlesProps> = ({ density = 40 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < density; i++) {
        particlesRef.current.push(createParticle(canvas));
      }
    };

    const createParticle = (canvas: HTMLCanvasElement): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height + canvas.height, // Start below or random
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: Math.random() * -1 - 0.5, // Move upwards
      opacity: Math.random() * 0.5 + 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
    });

    initParticles();

    // Drawing Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((p, i) => {
        // Update
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5; // Wavy motion
        p.rotation += p.rotationSpeed;
        
        // Reset if out of bounds
        if (p.y < -50) {
          particlesRef.current[i] = {
            ...createParticle(canvas),
            y: canvas.height + 10,
          };
        }

        // Draw Crow Shape (Simplified V shape)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#0a0a0a'; // Dark color
        
        // Draw wing left
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-p.size * 3, -p.size, -p.size * 4, 0);
        ctx.quadraticCurveTo(-p.size * 2, p.size * 0.5, 0, 0);
        ctx.fill();

        // Draw wing right
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(p.size * 3, -p.size, p.size * 4, 0);
        ctx.quadraticCurveTo(p.size * 2, p.size * 0.5, 0, 0);
        ctx.fill();
        
        ctx.restore();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [density]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default CrowParticles;
