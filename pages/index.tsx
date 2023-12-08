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
import Header from "@/components/atoms/Header/Header";
import Button from "@/components/atoms/Button/Button";

type Tag = {
  id: number;
  name: string;
};

type Application = {
  id: string;
  title: string;
  company: string;
  link?: string | null;
  description?: string | null;
  feedback?: string | null;
  recruiter?: String;
  location?: String;
  language?: String;
  applicationDate?: String;
  tags?: Tag[];
};

export default function Home({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [openForm, setOpenForm] = useState(false);
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
  const [tags, setTags] = useState([]);

  const data = {
    title,
    description,
    company,
    link,
    feedback,
    applicationDate,
    language,
    recruiter,
    location,
    tags,
  };

  const submitApplication = async () => {
    try {
      const response = await axios.post(`/api/vacancies`, data);
      window.location.reload();
      setCompany("");
      setTitle("");
      setFeedback("");
      setDescription("");
      setLink("");
      setApplicationDate("");
      setLanguage("");
      setRecruiter("");
      setLocation("");
      setTag("");
      setTags([]);
      console.log("New application added:", response);
    } catch (error) {
      console.log(`Error submitting the application: ${error}`);
    }
  };

  const addNewTag = () => {
    tags.push(tag);
    setTag("");
  };

  const removeTag = (i: number) => {
    const newArray = [...tags.slice(0, i), ...tags.slice(i + 1)];
    setTags(newArray);
    setTag("");
  };

  return (
    <main className={styles.main}>
      <div>
        <Header>Welcome to itClimber</Header>
        <Button onClick={() => setOpenForm(!openForm)}>
          {openForm ? "Hide form" : "+ New Vacancy"}
        </Button>
        {openForm && (
          <div className={styles.formContainer}>
            <div className={styles.formBody}>
              <label htmlFor="applicationDate">submitting date:</label>
              <input
                type="date"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
                id="applicationDate"
                name="applicationDate"
              />
              <label>title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <label>description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              <label>tags</label>
              {tags &&
                tags.map((tag, i) => (
                  <div key={i}>
                    <li>{tag}</li>
                    <button onClick={() => removeTag(i)}>remove</button>
                  </div>
                ))}
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <button onClick={() => addNewTag()}>add</button>

              <label>feedback</label>
              <input
                type="text"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <div className={styles.submitButton}>
              {" "}
              <Button onClick={submitApplication}>Add vacancy</Button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.cardSection}>
        {response.map((application) => (
          <Card key={application.id} application={application} />
        ))}
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
        response: applications as Application[],
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
