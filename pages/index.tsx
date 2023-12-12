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
import FormLabel from "@/components/atoms/FormLabel/FormLabel";
import Tag from "@/components/atoms/Tag/Tag";
import Input from "@/components/atoms/Input/Input";
import TextArea from "@/components/atoms/TextArea/TextArea";
import Form from "@/components/Form/Form";

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
  console.log("index page- response:", response);
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
  const [addTag, setAddTag] = useState(false);
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

  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <Header variant="pageTitle">Welcome to itClimber</Header>
        <Form onSubmit={submitApplication} />
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
    const applications = await prisma.vacancy.findMany({
      include: {
        tags: true,
      },
    });

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
