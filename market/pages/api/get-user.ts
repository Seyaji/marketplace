import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  try {
    const user = await prisma.user.findUnique({ where: { address: address as string } });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(500).send({ message: "No user found" });
    }
  } catch (error) {
    res.status(500).send({ body: { message: error, address } });
  }
}
