import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updatePointHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { point } = req.body;

    const updatedPoint = await prisma.point.update({
      where: {
        id: Number(point.id),
      },
      data: {
        title: point.title,
        description: point.description,
        isPublic: point.isPublic,
        imagePath: point.imagePath,
      },
    });
    if (point.newListId && point.newListId !== point.listId) {
      await prisma.list.update({
        where: {
          id: Number(point.newListId),
        },
        data: {
          points: {
            connect: {
              id: point.id,
            },
          },
        },
      });
    }

    res.status(200).json({ updatedPoint, error: null });
  } catch (error) {
    console.error({ error });
    if (error instanceof Error) {
      res.status(400).json({ updatedpoint: null, error: error.message });
    } else {
      res
        .status(400)
        .json({ updatedpoint: null, error: 'Something went wrong' });
    }
  }
};

export default updatePointHandler;
