import prisma from "../../../prisma/client";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const id = req.query.vacancyId;

      const vacancyToDelete = await prisma.vacancy.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ success: true, vacancy: vacancyToDelete });
    } catch (error) {
      console.error("Error deleting vacancy:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
    res.status(400).json({ success: false, error: "Bad Request" });
    return;
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
