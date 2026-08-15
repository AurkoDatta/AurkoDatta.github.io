import { profile } from '../../data/profile';
import { useReveal } from '../../hooks/useReveal';
import styles from './About.module.css';

export function About() {
  const headingRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>(120);

  return (
    <section id="about" className={styles.about} aria-label="About">
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
          <p className={styles.label}>01 — About</p>
          <h2 className={styles.title}>Background</h2>
        </div>

        <div ref={bodyRef} className={styles.body}>
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
