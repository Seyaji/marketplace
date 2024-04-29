import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.listing.findMany().then((listings) => res.status(200).send(listings));
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error });
  }
  return;
}
