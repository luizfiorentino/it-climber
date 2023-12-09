import React from "react";
import styles from "./TextArea.module.css";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      {...props}
      className={`${styles.textareaContainer} ${className}`}
    />
  );
};

export default TextArea;
