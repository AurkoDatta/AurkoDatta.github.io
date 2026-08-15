import { skillGroups } from '../../data/skills';
import { useReveal } from '../../hooks/useReveal';
import styles from './Skills.module.css';

function SkillGroupCard({
  label,
  items,
  delayMs,
}: {
  label: string;
  items: string[];
  delayMs: number;
}) {
  const ref = useReveal<HTMLDivElement>(delayMs);

  return (
    <div ref={ref} className={styles.group}>
      <p className={styles.groupLabel}>{label}</p>
      <ul className={styles.itemList}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className={styles.skills} aria-label="Skills">
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
          <p className={styles.label}>02 — Skills</p>
          <h2 className={styles.title}>Tech Stack</h2>
        </div>

        <div className={styles.grid}>
          {skillGroups.map((group, index) => (
            <SkillGroupCard
              key={group.label}
              label={group.label}
              items={group.items}
              delayMs={index * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
