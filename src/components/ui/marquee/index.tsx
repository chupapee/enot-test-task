import { ReactNode } from 'react';
import styles from './styles.module.css';

export function Marquee({ children }: { children: ReactNode }) {
  return <p className={styles.marquee}>{children}</p>;
}