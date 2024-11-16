import styles from "./Grid.module.css";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 4 | 6;
  className?: string;
}

export function Grid({
  children,
  columns = 4,
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={`${styles.grid} ${styles[`columns${columns}`]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
