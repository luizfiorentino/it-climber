import React from "react";
import styles from "./BigHeader.module.css";
import { fontInter } from "../../../styles/fonts";

export interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = ({
  children,
  level = 2,
  className,
  ...props
}: HeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag
      {...props}
      className={`${styles.heading} ${className} ${fontInter.className}`}
    >
      {children}
    </HeadingTag>
  );
};

export default Heading;
