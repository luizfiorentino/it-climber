import React, { HTMLAttributes } from "react";
import styles from "./Card.module.css";
import Header from "../atoms/Header/Header";
import TextFragment from "../atoms/TextFragment/TextFragment";
import axios from "axios";
import Link from "../atoms/Link/Link";
import Button from "../atoms/Button/Button";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  application: {
    id: string;
    title: string;
    company: string;
    link?: string | null;
    description?: string | null;
    feedback?: string | null;
  };
  children?: React.ReactNode;
}

export default function Card({ application, children, ...props }: CardProps) {
  const { id, title, company, link, description, feedback } = application;
  const deleteApplication = async (vacancyId: string | null) => {
    try {
      await axios.delete(`/api/vacancies/${vacancyId}`);
      console.log(`Vacancy with id ${vacancyId} deleted.`);
      window.location.reload();
    } catch (error) {
      console.log("Error deleting vacancy:", error);
    }
  };

  return (
    <div className={styles.card} {...props}>
      <div className={styles.applicationTitle}>
        <Link href={`/applications/${id}`}>
          <Header>{title}</Header>
        </Link>
      </div>

      <div className={styles.companyField}>
        <Header level={4}>@</Header>
        <TextFragment>{company}</TextFragment>
      </div>
      {link && <Header level={4}>Link: {link}</Header>}
      {description && <TextFragment>Description: {description}</TextFragment>}
      {feedback && <TextFragment>Feedback: {feedback}</TextFragment>}
      {children}
      <div className={styles.deleteButton}>
        <Button variant="red" onClick={() => deleteApplication(id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
