import { Github, Linkedin, Download, Command } from 'lucide-react';
import { navSections } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { IconButton } from '../IconButton/IconButton';
import styles from './Header.module.css';

const sectionIds = navSections.map((s) => s.id);

interface HeaderProps {
  onOpenPalette: () => void;
}

export function Header({ onOpenPalette }: HeaderProps) {
  const active = useActiveSection(sectionIds);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.wordmark}>
          <span className={styles.wordmarkDot} aria-hidden="true" />
          {profile.name}
        </a>

        <nav className={styles.nav} aria-label="Section navigation">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={styles.navLink}
              aria-current={active === section.id ? 'true' : undefined}
              data-active={active === section.id || undefined}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.paletteButton}
            onClick={onOpenPalette}
            aria-label="Search and jump to section"
            title="Search and jump to section"
          >
            <Command aria-hidden="true" size={14} />
            <span className={styles.paletteLabel}>
              Search
              <kbd className={styles.kbd}>&#8984;K</kbd>
            </span>
          </button>
          <IconButton
            as="a"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            icon={<Github aria-hidden="true" />}
            label="GitHub profile"
          />
          <IconButton
            as="a"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            icon={<Linkedin aria-hidden="true" />}
            label="LinkedIn profile"
          />
          <IconButton
            as="a"
            href={profile.resumeUrl}
            download
            variant="solid"
            icon={<Download aria-hidden="true" />}
            label="Download resume"
          />
        </div>
      </div>
    </header>
  );
}
