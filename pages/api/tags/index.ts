import prisma from "../../../prisma/client";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name } = req.body;
      if (!name) {
        console.log("POST /api/tags - error adding tag. Please inform name");
        res.status(400).json({ success: false, error: "Bad Request" });
        return;
      }

      const newTag = await prisma.tag.create({
        data: {
          name,
        },
      });
      console.log("new application submitted:", newTag);

      res.status(201).json({ success: true, tag: newTag });
    } catch (error) {
      console.error("Error adding tag:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
    //   } else if (req.method === "DELETE") {
    //     const { vacancyId } = req.body;
    //     console.log("from /api/vacancies req.body??", vacancyId);
    //     console.log(`Vacancy with id ${vacancyId} deleted.`);
    //     try {
    //       const vacancyToDelete = await prisma.vacancy.delete({
    //         where: {
    //           id: vacancyId,
    //         },
    //       });
    //       res.status(200).json({ success: true, vacancy: vacancyToDelete });
    //     } catch (error) {
    //       console.error("Error deleting vacancy:", error);
    //       res.status(500).json({ success: false, error: "Internal Server Error" });
    //     }
    //   } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
