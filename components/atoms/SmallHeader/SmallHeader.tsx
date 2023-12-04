import React from "react";
import styles from "./SmallHeader.module.css";
import { fontInter } from "../../../styles/fonts";

export interface SmallHeadingProps extends React.HTMLProps<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const SmallHeading = ({
  children,
  level = 4,
  className,
  ...props
}: SmallHeadingProps) => {
  const SmallHeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <SmallHeadingTag
      {...props}
      className={`${styles.heading} ${className} ${fontInter.className}`}
    >
      {children}
    </SmallHeadingTag>
  );
};

export default SmallHeading;
