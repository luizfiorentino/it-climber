import styles from "./detailsPage.module.css";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetServerSidePropsResult,
} from "next";
import prisma from "@/prisma/client";
import Heading from "@/components/atoms/BigHeader/BigHeader";
import SmallHeading from "@/components/atoms/SmallHeader/SmallHeader";

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
  console.log("details page, application", application);

  if (!application) {
    return (
      <main className={styles.main}>
        <div>
          <SmallHeading>Application not found</SmallHeading>
        </div>
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <div>
        <Heading>{application.title}</Heading>
        <SmallHeading>
          {application.applicationDate && application.applicationDate}
        </SmallHeading>
        <SmallHeading>@ {application.company}</SmallHeading>
        <SmallHeading>{application.link && application.link}</SmallHeading>
        <SmallHeading>
          {application.location && application.location}
        </SmallHeading>
        {application.tags && <SmallHeading>tags:</SmallHeading>}
        {application.tags &&
          application.tags.map((tag) => (
            <SmallHeading key={tag.id}>- {tag.name}</SmallHeading>
          ))}
        <SmallHeading>{application.description}</SmallHeading>

        <SmallHeading>
          {application.recruiter && application.recruiter}
        </SmallHeading>
        <SmallHeading>
          {application.language && `language(s): ${application.language}`}
        </SmallHeading>
        <SmallHeading>
          {application.feedback && application.feedback}
        </SmallHeading>
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
