import { useState } from "react";
import styles from "./page.module.css";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetServerSidePropsResult,
} from "next";
import axios from "axios";
import prisma from "@/prisma/client";
import Card from "@/components/Card/Card";

type Application = {
  id: number;
  title: string;
  company: string;
  link?: string | null;
  description?: string | null;
  feedback?: string | null;
};

export default function Home({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [link, setLink] = useState("");
  const [feedback, setFeedback] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [location, setLocation] = useState("");
  const [recruiter, setRecruiter] = useState("");
  const [language, setLanguage] = useState("");
  const [tag, setTag] = useState("");

  const data = { title, description, company, link, feedback };

  const submitApplication = async () => {
    await axios.post(`/api/vacancies`, data);
    setCompany("");
    setTitle("");
    setFeedback("");
    setDescription("");
    setLink("");
  };

  console.log("application data?", applicationDate);

  return (
    <main className={styles.main}>
      <div>
        <h2>Welcome to itClimber</h2>
        <h4>+ New Vacancy</h4>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <form>
            <label htmlFor="applicationDate">Application Date:</label>
            <input
              type="date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
              id="applicationDate"
              name="applicationDate"
            />
            <button
              type="submit"
              onClick={() => setApplicationDate(applicationDate)}
            >
              Submit
            </button>
          </form>

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
          <label>location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>recruiter</label>
          <input
            type="text"
            value={recruiter}
            onChange={(e) => setRecruiter(e.target.value)}
          />
          <label>language</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <label>tag</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <label>feedback</label>
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button onClick={submitApplication}>Add</button>
        </div>

        <div className={styles.cardSection}>
          {response.map((application) => (
            <Card key={application.id} application={application} />
          ))}
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  response: Application[];
}> = async (): Promise<
  GetServerSidePropsResult<{ response: Application[] }>
> => {
  try {
    const applications = await prisma.vacancy.findMany();

    return {
      props: {
        response: applications,
      },
    };
  } catch (error) {
    return {
      props: {
        response: [],
      },
    };
  }
};
