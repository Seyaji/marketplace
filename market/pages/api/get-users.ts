import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(reg: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany();
    if (users) {
      res.status(200).send(users);
    } else {
      res.status(500).send({ message: "Could not retrive users" });
    }
  } catch (error) {
    res.status(500).send({ body: { message: "Could not retrive users", error } });
  }
}
