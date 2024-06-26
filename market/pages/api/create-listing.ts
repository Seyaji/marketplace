import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.body) {
      const { name, address, author, image, abi } = req.body;
      await prisma.listing.create({
        data: {
          // placeholder until upload custom abi completed
          abi: abi || "test",
          name,
          address,
          author,
          image,
        },
      });
    }
    res.status(200).json({ msg: "Success!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
