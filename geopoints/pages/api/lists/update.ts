import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { List } from '../../../types/types';
import createTagsIfTheyDontExist from '../../../util/createTagsHelper';

const prisma = new PrismaClient();

const updateListHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { list } = req.body;
    const updatedList = await prisma.list.update({
      where: {
        id: Number(list.id),
      },
      data: {
        title: list.title,
        description: list.description, 
        isPublic: list.isPublic,
        imagePath: list.imagePath
      }
    });
    res.status(200).json({ updatedList, error: null });
  } catch (error) {
    console.error({ error });
    if (error instanceof Error) {
      res.status(400).json({ updatedList: null, error: error.message });
    } else {
      res
        .status(400)
        .json({ updatedList: null, error: 'Something went wrong' });
    }
  }
};


export default updateListHandler;
