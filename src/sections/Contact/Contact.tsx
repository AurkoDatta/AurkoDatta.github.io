import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { useReveal } from '../../hooks/useReveal';
import { IconButton } from '../../components/IconButton/IconButton';
import styles from './Contact.module.css';

export function Contact() {
  const headingRef = useReveal<HTMLDivElement>();
  const cardRef = useReveal<HTMLDivElement>(120);

  return (
    <section id="contact" className={styles.contact} aria-label="Contact">
      <div className={styles.inner}>
        <div ref={headingRef} className={styles.heading}>
          <p className={styles.label}>06 — Contact</p>
          <h2 className={styles.title}>Let&apos;s Talk</h2>
          <p className={styles.subtitle}>
            Open to internships, new grad roles, and interesting problems. Reach out directly or
            find me on the platforms below.
          </p>
        </div>

        <div ref={cardRef} className={styles.card}>
          <a href={`mailto:${profile.email}`} className={styles.primaryLink}>
            <Mail aria-hidden="true" size={18} />
            {profile.email}
          </a>

          <div className={styles.socials}>
            <IconButton
              as="a"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              icon={<Github aria-hidden="true" size={20} />}
              label="GitHub"
              variant="solid"
            />
            <IconButton
              as="a"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              icon={<Linkedin aria-hidden="true" size={20} />}
              label="LinkedIn"
              variant="solid"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
