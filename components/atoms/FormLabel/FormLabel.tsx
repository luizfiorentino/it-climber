import React from "react";
import styles from "./FormLabel.module.css";
import { fontDosis } from "@/styles/fonts";

export interface FormLabelProps extends React.HTMLProps<HTMLLabelElement> {
  variant?: string;
}

const FormLabel = ({
  children,
  className,
  variant,
  ...props
}: FormLabelProps) => {
  return (
    <label
      {...props}
      className={`${styles.labelContainer} ${className} ${fontDosis.className}`}
    >
      {variant === "tag" && "-"} {children}
    </label>
  );
};

export default FormLabel;
