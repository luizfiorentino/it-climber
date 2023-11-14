import prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("from /api/vacancies, req.body:", req.body);
    try {
      const { title, company, link, description, feedback } = req.body;
      if (!title || !company) {
        console.log(
          "POST /api/vacancies - error adding new vacancy. Please inform title and company name"
        );
      }
      const newVacancy = await prisma.vacancy.create({
        data: {
          title,
          company,
          link,
          description,
          feedback,
        },
      });
      console.log("new application submitted:", newVacancy);

      res.status(201).json({ success: true, vacancy: newVacancy });
    } catch (error) {
      console.error("Error creating vacancy:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
