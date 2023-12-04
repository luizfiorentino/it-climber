import { useState, useContext } from "react";
import styles from "./detailsPage.module.css";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetServerSidePropsResult,
} from "next";
import axios from "axios";
import prisma from "@/prisma/client";
import Card from "@/components/Card/Card";
import Heading from "@/components/atoms/BigHeader/BigHeader";

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
};

export default function DetailsPage({
  application,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("details page, application", application);
  return (
    <main className={styles.main}>
      <div>
        <Heading>Details Page</Heading>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  application: Application;
}> = async (
  context
): Promise<GetServerSidePropsResult<{ response: Application }>> => {
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
        application: application,
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
