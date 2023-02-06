import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, listId, liked } = req.body
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new Error('User not found')
    }
    if (liked) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          likedLists: {
            disconnect: {
              id: listId
            }
          }
        }
      })
      res.status(200).json({ message: 'List removed from likedLists' })
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          likedLists: {
            connect: {
              id: listId
            }
          }
        }
      })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
