import styles from "./Grid.module.css";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 3 | 4 | 6;
  gutter?: 20 | 60;
  className?: string;
}

export function Grid({
  children,
  columns = 4,
  gutter = 20,
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={`${styles.grid} ${styles[`columns${columns}`]} ${styles[`gutter${gutter}`]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
