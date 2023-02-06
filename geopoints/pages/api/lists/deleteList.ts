import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, listId } = req.body
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new Error('User not found')
    }
    const list = await prisma.list.findUnique({ where: { id: listId }})
    if (!list) {
      throw new Error('List not found')
    }
    if(userId !== list.authorId) {
      throw new Error('You cannot delete this list')
    } else {
      const deletedList = await prisma.list.delete({ where: { id: listId }})
      res.status(204).json({ message : 'List successfully deleted' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
