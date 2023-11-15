import { useState } from "react";
import styles from "./page.module.css";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";
import prisma from "@/prisma/client";

type Application = {
  title: string;
  company: string;
  link?: string;
  description?: string;
  feedback?: string;
};

export default function Home({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [link, setLink] = useState("");
  const [feedback, setFeedback] = useState("");

  const data = { title, description, company, link, feedback };
  console.log("reponse??", response);

  const submitApplication = async () => {
    await axios.post(`/api/vacancies`, data);
    setCompany("");
    setTitle("");
    setFeedback("");
    setDescription("");
    setLink("");
  };

  return (
    <main className={styles.main}>
      <div>
        <h2>Welcome to itClimber</h2>
        <h4>+ New Vacancy</h4>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <label>link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <label>feedback</label>
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button onClick={submitApplication}>Add</button>
        </div>
        {response.map((application) => (
          <>
            <p>{application.title}</p>
            <p>{application.company}</p>
          </>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  response: Application[];
}> = async () => {
  try {
    const applications = await prisma.vacancy.findMany();
    console.log("applications?", applications);
    return {
      props: {
        response: applications,
      },
    };
  } catch (error) {
    console.log("getServerSideProps error fetching applications");
    return {
      props: {
        response: {
          applications: [],
        },
      },
    };
  }
};
