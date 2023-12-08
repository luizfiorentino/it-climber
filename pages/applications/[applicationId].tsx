import styles from "./detailsPage.module.css";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetServerSidePropsResult,
} from "next";
import prisma from "@/prisma/client";
import Heading from "@/components/atoms/Header/Header";
import Header from "@/components/atoms/Header/Header";

type Tag = {
  id: number;
  name: string;
};
type Application = {
  id: number;
  title: string;
  company: string;
  link?: string | null;
  description?: string | null;
  feedback?: string | null;
  recruiter?: string;
  location?: string;
  language?: string;
  applicationDate?: string;
  tags?: Tag[];
};

export default function DetailsPage({
  application,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!application) {
    return (
      <main className={styles.main}>
        <div>
          <Header>Application not found</Header>
        </div>
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <div>
        <Heading>{application.title}</Heading>
        <Header>
          {application.applicationDate && application.applicationDate}
        </Header>
        <Header>@ {application.company}</Header>
        <Header>{application.link && application.link}</Header>
        <Header>{application.location && application.location}</Header>
        {application.tags && <Header>tags:</Header>}
        {application.tags &&
          application.tags.map((tag) => (
            <Header key={tag.id}>- {tag.name}</Header>
          ))}
        <Header>{application.description}</Header>

        <Header>{application.recruiter && application.recruiter}</Header>
        <Header>
          {application.language && `language(s): ${application.language}`}
        </Header>
        <Header>{application.feedback && application.feedback}</Header>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  application: Application | null;
}> = async (
  context
): Promise<GetServerSidePropsResult<{ application: Application | null }>> => {
  try {
    const applicationId = context.params?.applicationId as string;
    const application = await prisma.vacancy.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        tags: true,
      },
    });

    return {
      props: {
        application: application as Application | null,
      },
    };
  } catch (error) {
    console.log("DetailsPage: error fetching application data:", error);
    return {
      props: {
        application: null,
      },
    };
  }
};
