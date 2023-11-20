import React, { HTMLAttributes } from "react";
import styles from "./Card.module.css";
import Heading from "../atoms/BigHeader/BigHeader";
import SmallHeading from "../atoms/SmallHeader/SmallHeader";
import RegularText from "../atoms/RegularText/RegularText";
import axios from "axios";

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
  const { id, title, company, link, description, feedback } = application;
  const deleteApplication = async (vacancyId: number | null) => {
    try {
      await axios.delete(`/api/vacancies/${vacancyId}`);
      console.log(`Vacancy with id ${vacancyId} deleted.`);
    } catch (error) {
      console.log("Error deleting vacancy:", error);
    }
  };

  return (
    <div className={styles.card} {...props}>
      <Heading>{title}</Heading>
      <div className={styles.companyField}>
        <SmallHeading>@</SmallHeading>
        <RegularText>{company}</RegularText>
      </div>
      {link && <SmallHeading>Link: {link}</SmallHeading>}
      {description && <RegularText>Description: {description}</RegularText>}
      {feedback && <RegularText>Feedback: {feedback}</RegularText>}
      {children}
      <button onClick={() => deleteApplication(id)}>Delete</button>
    </div>
  );
}
