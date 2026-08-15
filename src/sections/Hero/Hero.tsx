import { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, FileDown } from 'lucide-react';
import { profile } from '../../data/profile';
import { createNBodyField } from '../../lib/nbody';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './Hero.module.css';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const field = createNBodyField(canvas, {
      faintColor: '#6c7186',
      accentColor: '#4dd9c7',
    });

    if (prefersReducedMotion) {
      field.renderStaticFrame();
    } else {
      field.start();
    }

    return () => field.destroy();
  }, [prefersReducedMotion]);

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <canvas ref={canvasRef} className={styles.field} aria-hidden="true" />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} />
          SYS.STATUS — ONLINE
        </p>

        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>{profile.tagline}</p>

        <div className={styles.actions}>
          <a
            className={styles.primaryAction}
            href={profile.resumeUrl}
            download
          >
            <FileDown aria-hidden="true" size={18} />
            Download Resume
          </a>
          <a
            className={styles.secondaryAction}
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github aria-hidden="true" size={18} />
            GitHub
          </a>
          <a
            className={styles.secondaryAction}
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin aria-hidden="true" size={18} />
            LinkedIn
          </a>
        </div>
      </div>

      <a href="#about" className={styles.scrollCue} aria-label="Scroll to About section">
        <span>SCROLL</span>
        <ArrowDown aria-hidden="true" size={16} />
      </a>
    </section>
  );
}
