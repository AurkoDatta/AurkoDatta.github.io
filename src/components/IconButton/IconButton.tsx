import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

interface BaseProps {
  icon: ReactNode;
  label: string;
  variant?: 'ghost' | 'solid';
}

type AnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };
type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type IconButtonProps = AnchorProps | ButtonProps;

export const IconButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  IconButtonProps
>(function IconButton({ icon, label, variant = 'ghost', as, className, ...rest }, ref) {
  const classes = [styles.button, variant === 'solid' ? styles.solid : styles.ghost, className]
    .filter(Boolean)
    .join(' ');

  if (as === 'a') {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        aria-label={label}
        title={label}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      aria-label={label}
      title={label}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon}
    </button>
  );
});
