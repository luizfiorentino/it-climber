import React from "react";
import styles from "./Input.module.css";
import { fontDosis } from "@/styles/fonts";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`${styles.inputField} ${fontDosis.className}`}
    />
  );
};

export default Input;
