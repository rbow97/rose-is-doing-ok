import { clsx } from "clsx";
import styles from "./Grid.module.css";
import React from "react";

interface GridProps {
  children: React.ReactNode;
  columns?: 3 | 4 | 6;
  gutter?: 20 | 60;
  className?: string;
}

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  mobile?: {
    column: `${number} / ${number}`;
    row?: `${number} / ${number}`;
  };
  desktop?: {
    column: `${number} / ${number}`;
    row?: `${number} / ${number}`;
  };
  className?: string;
}

export function Grid({
  children,
  columns = 4,
  gutter = 20,
  className,
}: GridProps) {
  return (
    <div
      className={clsx(
        styles.grid,
        styles[`columns${columns}`],
        styles[`gutter${gutter}`],
        className
      )}
    >
      {children}
    </div>
  );
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ children, mobile, desktop, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.gridItem, className)}
        style={
          {
            "--mobile-column": mobile?.column,
            "--mobile-row": mobile?.row,
            "--desktop-column": desktop?.column,
            "--desktop-row": desktop?.row,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = "GridItem";

Grid.Item = GridItem;
