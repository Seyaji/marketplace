import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import prisma from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req.body;
  try {
    console.log(body);
    console.log(req.body);
    res.status(200).send("received");
  } catch (error) {
    res.status(500).send(error);
  }
}
