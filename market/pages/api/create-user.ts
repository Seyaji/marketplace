import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body) {
    const { name, address, image } = req.body;
    await prisma.user
      .create({
        data: {
          name,
          address,
          image,
        },
      })
      .then(() => res.status(200).send({ message: "Success!" }))
      .catch((error) => res.status(500).send({ error: error }));
  }
}
