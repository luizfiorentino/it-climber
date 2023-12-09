import React from "react";
import styles from "./TextArea.module.css";
import { fontDosis } from "@/styles/fonts";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      {...props}
      className={`${styles.textareaContainer} ${fontDosis.className}`}
    />
  );
};

export default TextArea;
