import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { navSections } from '../../data/navigation';
import { profile } from '../../data/profile';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './CommandPalette.module.css';

interface CommandItem {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const items = useMemo<CommandItem[]>(
    () => [
      ...navSections.map((section) => ({
        id: `nav-${section.id}`,
        label: section.label,
        hint: 'Jump to section',
        icon: <ArrowRight aria-hidden="true" size={16} />,
        action: () => {
          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
        },
      })),
      {
        id: 'github',
        label: 'GitHub',
        hint: profile.github.replace('https://', ''),
        icon: <Github aria-hidden="true" size={16} />,
        action: () => window.open(profile.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        hint: profile.linkedin.replace('https://', ''),
        icon: <Linkedin aria-hidden="true" size={16} />,
        action: () => window.open(profile.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'email',
        label: 'Email',
        hint: profile.email,
        icon: <Mail aria-hidden="true" size={16} />,
        action: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: 'resume',
        label: 'Download resume',
        hint: 'PDF',
        icon: <Download aria-hidden="true" size={16} />,
        action: () => {
          const link = document.createElement('a');
          link.href = profile.resumeUrl;
          link.download = '';
          link.click();
        },
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) => item.label.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  function handlePanelKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'input, button:not([disabled])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function runItem(item: CommandItem | undefined) {
    if (!item) return;
    item.action();
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runItem(filtered[activeIndex]);
    }
  }

  const transition = reducedMotion ? { duration: 0 } : { duration: 0.18, ease: [0.2, 0.8, 0.2, 1] as const };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} role="presentation">
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
          />
          <motion.div
            ref={panelRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={handlePanelKeyDown}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.97, y: reducedMotion ? 0 : -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.97, y: reducedMotion ? 0 : -8 }}
            transition={transition}
          >
            <div className={styles.inputRow}>
              <input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder="Jump to a section or link..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Command search"
              />
              <kbd className={styles.escHint}>ESC</kbd>
            </div>
            <ul className={styles.list} role="listbox">
              {filtered.length === 0 && <li className={styles.empty}>No matches</li>}
              {filtered.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={styles.item}
                    data-active={index === activeIndex || undefined}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => runItem(item)}
                    role="option"
                    aria-selected={index === activeIndex}
                  >
                    <span className={styles.itemIcon}>{item.icon}</span>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemHint}>{item.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
