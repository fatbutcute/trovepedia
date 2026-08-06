// src/components/common/SectionDivider.jsx
import React from 'react';
import styles from './SectionDivider.module.css';

export default function SectionDivider() {
  return (
    <div className={styles.dividerWrapper}>
      <div className={styles.line} />
    </div>
  );
}