import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("from back end req.body:", req.body);

  if (req.method === "POST") {
    const {
      title,
      description,
      company,
      link,
      feedback,
      applicationDate,
      language,
      recruiter,
      location,
      tag,
    } = req.body;

    try {
      const newVacancy = await prisma.vacancy.create({
        data: {
          title,
          description,
          company,
          link,
          feedback,
          applicationDate,
          language,
          recruiter,
          location,
          tags: {
            create: {
              name: tag,
            },
          },
        },
      });

      console.log("POST /api/vacancies. New vacancy added:", newVacancy);
      res.status(204).end();
    } catch (error) {
      console.error("Error creating new vacancy:", error);
      res.status(500).json({
        message:
          "POST /api/vacancies - An error occurred when creating a new application",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
