import React, { ButtonHTMLAttributes } from "react";
import { fontInter } from "@/styles/fonts";
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
        fontInter.className
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
