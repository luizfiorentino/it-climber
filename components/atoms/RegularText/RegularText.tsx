import React from "react";
import styles from "./RegularText.module.css";

export interface RegularTextProps
  extends React.HTMLProps<HTMLParagraphElement> {}

const RegularText = ({ children, className, ...props }: RegularTextProps) => {
  return (
    <p {...props} className={`${styles.mainContainer} ${className}`}>
      {children}
    </p>
  );
};

export default RegularText;
