import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { address } = req.query;
    if (address) {
      const contract = await prisma.listing.findUnique({ where: { address: address as string } });

      if (contract) {
        res.status(200).send({ contract });
      } else {
        res.status(500).send({ message: "No contract found" });
      }
    } else {
      res.status(200).send({ message: "Invalid contract address " });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}
