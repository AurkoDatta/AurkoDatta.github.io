import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { IconButton } from '../IconButton/IconButton';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.credit}>
          &copy; {year} {profile.name}. Built with React, TypeScript &amp; Vite.
        </p>
        <div className={styles.actions}>
          <IconButton
            as="a"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            icon={<Github aria-hidden="true" size={18} />}
            label="GitHub profile"
          />
          <IconButton
            as="a"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            icon={<Linkedin aria-hidden="true" size={18} />}
            label="LinkedIn profile"
          />
          <IconButton
            as="a"
            href={`mailto:${profile.email}`}
            icon={<Mail aria-hidden="true" size={18} />}
            label="Email Aurko"
          />
        </div>
      </div>
    </footer>
  );
}
