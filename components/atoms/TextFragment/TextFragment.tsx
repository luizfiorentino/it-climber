import React from "react";
import styles from "./TextFragment.module.css";
import { fontDosis } from "@/styles/fonts";

export interface TextFragmentProps
  extends React.HTMLProps<HTMLParagraphElement> {
  variant?: string;
}

const TextFragment = ({ children, className, ...props }: TextFragmentProps) => {
  return (
    <p
      {...props}
      className={`${styles.mainContainer} ${className} ${fontDosis.className}`}
    >
      {children}
    </p>
  );
};

export default TextFragment;
