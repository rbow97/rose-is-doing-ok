"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./Table.module.css";

// Base Table Components
interface TableRootProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableRootProps) {
  return <table className={clsx(styles.table, className)}>{children}</table>;
}

// Header Components
interface TableHeaderProps {
  children: ReactNode;
}

Table.Header = function TableHeader({ children }: TableHeaderProps) {
  return <thead>{children}</thead>;
};

Table.HeaderRow = function TableHeaderRow({ children }: TableHeaderProps) {
  return <tr>{children}</tr>;
};

Table.HeaderCell = function TableHeaderCell({ children }: TableHeaderProps) {
  return <th className={styles.header}>{children}</th>;
};

// Body Components
Table.Body = function TableBody({ children }: TableHeaderProps) {
  return <tbody>{children}</tbody>;
};

interface TableRowProps {
  children: ReactNode;
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
}

Table.Row = function TableRow({
  children,
  onHover,
  onLeave,
  onClick,
}: TableRowProps) {
  return (
    <tr
      className={styles.tableRow}
      onClick={() => onClick?.()}
      onMouseEnter={() => onHover?.()}
      onMouseLeave={() => onLeave?.()}
    >
      {children}
    </tr>
  );
};

Table.Cell = function TableCell({ children }: TableHeaderProps) {
  return <td>{children}</td>;
};
