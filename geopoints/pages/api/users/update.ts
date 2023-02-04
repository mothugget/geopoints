import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, userName, name, imagePath, bio, facebook, instagram } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        userName,
        bio,
        imagePath,
        facebook,
        instagram,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error({ error });
    res.status(500).json({error});
  }
};

export default updateUser;