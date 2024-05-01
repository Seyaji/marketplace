import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  try {
    if (address) {
      const contracts = await prisma.listing.findMany({
        where: { author: address as string },
      });
      res.status(200).send(contracts);
    } else {
      res.status(500).send({ message: "No contracts found" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}
