import React, { HTMLAttributes } from "react";
import styles from "./Card.module.css";
import Heading from "../atoms/BigText/BigText";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  application: {
    id: number | null;
    title: string;
    company: string;
    link?: string | null;
    description?: string | null;
    feedback?: string | null;
  };
  children?: React.ReactNode;
}

export default function Card({ application, children, ...props }: CardProps) {
  const { title, company, link, description, feedback } = application;

  return (
    <div className={styles.card} {...props}>
      <Heading>{title}</Heading>

      <p>{company}</p>
      {link && <p>Link: {link}</p>}
      {description && <p>Description: {description}</p>}
      {feedback && <p>Feedback: {feedback}</p>}
      {children}
    </div>
  );
}
