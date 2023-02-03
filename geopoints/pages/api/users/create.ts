import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createNewUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userName, name, email, imagePath } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        userName,
        email,
        imagePath,
        ownLists: {
          create: [{ title: 'My Points' }],
        },
      }
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error });
  }
};

export default createNewUser;
