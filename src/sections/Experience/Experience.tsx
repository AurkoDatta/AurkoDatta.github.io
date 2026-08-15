import { experience } from '../../data/experience';
import { useReveal } from '../../hooks/useReveal';
import styles from './Experience.module.css';

function ExperienceItem({
  entry,
  delayMs,
}: {
  entry: (typeof experience)[number];
  delayMs: number;
}) {
  const ref = useReveal<HTMLDivElement>(delayMs);

  return (
    <div ref={ref} className={styles.entry}>
      <div className={styles.marker}>
        <span className={styles.node} />
        <span className={styles.line} aria-hidden="true" />
      </div>

      <div className={styles.card}>
        <p className={styles.period}>{entry.period}</p>
        <h3 className={styles.role}>{entry.role}</h3>
        <p className={styles.org}>
          {entry.org}
          {entry.team ? <span className={styles.team}> — {entry.team}</span> : null}
        </p>
        <ul className={styles.points}>
          {entry.points.map((point) => (
            <li key={point.slice(0, 32)} className={styles.point}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Experience() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="experience" className={styles.experience} aria-label="Experience">
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
          <p className={styles.label}>03 — Experience</p>
          <h2 className={styles.title}>Work History</h2>
        </div>

        <div className={styles.timeline}>
          {experience.map((entry, index) => (
            <ExperienceItem key={`${entry.org}-${entry.period}`} entry={entry} delayMs={index * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
