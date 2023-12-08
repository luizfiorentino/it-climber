import React from "react";
import styles from "./Header.module.css";
import { fontInter, fontDosis, fontJosefinSans } from "../../../styles/fonts";

export interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Header = ({ children, level = 2, className, ...props }: HeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className={styles.externalDiv}>
      <HeadingTag
        {...props}
        className={`${styles.headerMainContainer} ${className} ${fontDosis.className}`}
      >
        {children}
      </HeadingTag>
    </div>
  );
};

export default Header;
