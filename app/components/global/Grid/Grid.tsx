import { clsx } from "clsx";
import styles from "./Grid.module.css";
import React, { ComponentProps } from "react";

interface GridProps {
  children: React.ReactNode;
  columns?: 3 | 4 | 6;
  gutter?: 20 | 60;
  className?: string;
}

type GridItemProps<T extends AsElement> = ComponentProps<T> & {
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
  as?: T;
};

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

type AsElement = "div" | "article";

export function GridItem<T extends AsElement>(
  props: GridItemProps<T>
): JSX.Element {
  const {
    children,
    mobile,
    desktop,
    className,
    as: Element = "div",
    ...gridItemProps
  } = props;

  return (
    // @ts-expect-error - Even though using the generic `T` should fix `Element` or `restProps` to one set of either Anchor + Anchor props OR Button + Button props it seems that the type checker is still able to think of these two parts as being potentially both types at the same time. e.g. button props cannot be applied to an anchor element
    <Element
      className={clsx(styles.gridItem, className)}
      style={
        {
          "--mobile-column": mobile?.column,
          "--mobile-row": mobile?.row,
          "--desktop-column": desktop?.column,
          "--desktop-row": desktop?.row,
        } as React.CSSProperties
      }
      {...gridItemProps}
    >
      {children}
    </Element>
  );
}

// export const GridItem = React.forwardRef(
//   function GridItem<T extends AsElement>(
//     { children, mobile, desktop, className, as: Element = 'div', ...props }: GridItemProps<T>,
//     ref
//   ): JSX.Element {
//     return (
//       <Element
//         ref={ref}
//         className={clsx(styles.gridItem, className)}
//         style={
//           {
//             "--mobile-column": mobile?.column,
//             "--mobile-row": mobile?.row,
//             "--desktop-column": desktop?.column,
//             "--desktop-row": desktop?.row,
//           } as React.CSSProperties
//         }
//         {...props}
//       >
//         {children}
//       </Element>
//     );
//   }
// );

GridItem.displayName = "GridItem";

Grid.Item = GridItem;
