import React, { ButtonHTMLAttributes } from "react";
import { fontDosis } from "@/styles/fonts";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${styles.mainContainer} ${variant && styles[variant]} ${
        fontDosis.className
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
