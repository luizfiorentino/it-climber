import React, { AnchorHTMLAttributes } from "react";
import { fontDosis } from "@/styles/fonts";
import styles from "./Link.module.css";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: string;
};

const Link: React.FC<LinkProps> = ({
  children,
  variant = "default",
  ...props
}) => {
  return (
    <a
      {...props}
      className={`${styles.linkContainer} ${variant && styles[variant]} ${
        fontDosis.className
      }`}
    >
      {children}
    </a>
  );
};

export default Link;
