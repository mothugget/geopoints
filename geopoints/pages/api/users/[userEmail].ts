import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userEmail } = req.query;
    if (userEmail && typeof userEmail === 'string') {
      const userData = await prisma.user.findUnique({
        where: { email: userEmail },
        include: {
          ownLists: {
            include: {
              points: true,
            },
          },
          likedLists: true,
          likedPoints: true,
        },
      });
      userData
        ? res.status(200).json({ userData, error: false })
        : res.status(200).json({ userData: null, error: 'User not found' });
    } else {
      throw new Error('Incorrect email value');
    }
  } catch (error) {
    // console.error({ error });
    if (error instanceof Error) {
      res.status(500).json({ userData: null, error: error.message });
    } else {
      res.status(500).json({ userData: null, error: 'Something went wrong' });
    }
  }
};

export default getUserData;
