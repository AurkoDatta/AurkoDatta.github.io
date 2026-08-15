import { education } from '../../data/education';
import { useReveal } from '../../hooks/useReveal';
import styles from './Education.module.css';

function EducationCard({
  entry,
  delayMs,
}: {
  entry: (typeof education)[number];
  delayMs: number;
}) {
  const ref = useReveal<HTMLDivElement>(delayMs);

  return (
    <div ref={ref} className={styles.card}>
      <p className={styles.period}>{entry.period}</p>
      <h3 className={styles.school}>{entry.school}</h3>
      <p className={styles.credential}>{entry.credential}</p>

      {entry.notes && (
        <ul className={styles.notes}>
          {entry.notes.map((note) => (
            <li key={note.slice(0, 32)} className={styles.note}>
              {note}
            </li>
          ))}
        </ul>
      )}

      {entry.courses && (
        <ul className={styles.courses}>
          {entry.courses.map((course) => (
            <li key={course} className={styles.course}>
              {course}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Education() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="education" className={styles.education} aria-label="Education">
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
          <p className={styles.label}>05 — Education</p>
          <h2 className={styles.title}>Education</h2>
        </div>

        <div className={styles.grid}>
          {education.map((entry, index) => (
            <EducationCard key={entry.school} entry={entry} delayMs={index * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
