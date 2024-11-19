"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./TwoColumnTable.module.css";

interface TwoColumnTableProps {
  children: ReactNode;
  className?: string;
}

export function TwoColumnTable({ children, className }: TwoColumnTableProps) {
  return <table className={clsx(styles.table, className)}>{children}</table>;
}

interface HeaderProps {
  children?: ReactNode;
}

TwoColumnTable.Header = function Header({ children }: HeaderProps) {
  return (
    <thead className={styles.header}>
      <tr>
        <th className={styles.headerCell}>{children}</th>
      </tr>
    </thead>
  );
};

TwoColumnTable.Body = function Body({ children }: HeaderProps) {
  return <tbody className={styles.body}>{children}</tbody>;
};

interface RowGroupProps {
  year: string | number;
  children: ReactNode;
}

TwoColumnTable.RowGroup = function RowGroup({ year, children }: RowGroupProps) {
  return (
    <tr className={styles.rowGroup}>
      <td>{year}</td>
      <td>{children}</td>
    </tr>
  );
};

interface ContentRowProps {
  children: ReactNode;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
}

TwoColumnTable.ContentRow = function ContentRow({
  children,
  onClick,
  onHover,
  onLeave,
}: ContentRowProps) {
  return (
    <div
      className={styles.contentRow}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};
