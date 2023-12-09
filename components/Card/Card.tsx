import React, { HTMLAttributes } from "react";
import styles from "./Card.module.css";
import Header from "../atoms/Header/Header";
import TextFragment from "../atoms/TextFragment/TextFragment";
import axios from "axios";
import Link from "../atoms/Link/Link";
import Button from "../atoms/Button/Button";

type Tag = {
  id: number;
  name: string;
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  application: {
    id: string;
    title: string;
    company: string;
    link?: string | null;
    location?: string | null;
    feedback?: string | null;
    tags?: Tag[] | null;
  };
  children?: React.ReactNode;
}

export default function Card({ application, children, ...props }: CardProps) {
  const { id, title, company, link, location, feedback, tags } = application;
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

      <Header level={4}>Company: </Header>
      <TextFragment>{company}</TextFragment>

      {link && (
        <>
          <Header level={4}>Link:</Header>
          <TextFragment>{link}</TextFragment>{" "}
        </>
      )}
      {location && (
        <>
          <Header level={4}>Location: </Header>
          <TextFragment>{location}</TextFragment>
        </>
      )}
      {tags && (
        <>
          <Header level={4}>Tags: </Header>
          {tags.map((tag: Tag) => (
            <TextFragment variant="tag">{tag.name}</TextFragment>
          ))}
        </>
      )}
      {children}
      <div className={styles.deleteButton}>
        <Button variant="red" onClick={() => deleteApplication(id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
