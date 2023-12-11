import React from "react";
import styles from "./Tag.module.css";
import { fontUbuntu } from "@/styles/fonts";

export interface TagProps extends React.HTMLProps<HTMLDivElement> {
  variant?: string;
}

const Tag: React.FC<TagProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`${styles.tagContainer} ${variant && styles[variant]} ${
        fontUbuntu.className
      }`}
    >
      {children}
    </div>
  );
};

export default Tag;
