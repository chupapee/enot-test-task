import { ReactNode } from 'react';
import styles from './styles.module.css';

export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.marquee}>{children}</div>
    </div>
  );
}