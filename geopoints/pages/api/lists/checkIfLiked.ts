import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, listId } = req.body;

    const user = await prisma.user.findUnique({where: { id: userId }});

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const list = await prisma.list.findUnique({where: { id: listId }});

    if(!list) {
      return res.status(400).json({ error: 'List not found' });
    }

    const isLiked = await prisma.user.count({
      where: {
        id: userId,
        likedLists: {
          some: { id: listId },
        }
      }
    })
    .then(count => count > 0);

    res.json({ isLiked });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
