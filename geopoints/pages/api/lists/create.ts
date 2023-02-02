import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { List } from '../../../types/types';
import createTagsIfTheyDontExist from '../../../util/createTagsHelper';

const prisma = new PrismaClient();

const createListHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { listData, authorId } = req.body;
    if (!authorId) throw new Error('You must send listData and authorId');
    checkIflistDataIsValid(listData);
    const arrayOfTagIds = await createTagsIfTheyDontExist(listData.tags);
    const newList = await createList(listData, Number(authorId), arrayOfTagIds);
    res.status(200).json({ newList });
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error });
      res.status(400).send({ errorMessage: error.message });
    } else {
      res.status(400).send({ errorMessage: 'Something went wrong' });
    }
  }
};

const checkIflistDataIsValid = (listData: List) => {
  if (!listData) {
    throw new Error(
      'You must send a listData property on the body of the request'
    );
  }
  if (
    Object.hasOwn(listData, 'title') &&
    Object.hasOwn(listData, 'isPublic') &&
    Object.hasOwn(listData, 'tags')
  ) {
    return true;
  }
  throw new Error('Error: you must send a valid List object');
};

const createList = async (
  listData: List,
  authorId: number,
  arrayOfTagIds: { id: number }[]
) => {
  try {
    const { title, isPublic, description, imagePath } = listData;
    return await prisma.list.create({
      data: {
        title,
        isPublic,
        authorId,
        description,
        imagePath,
        tags: {
          connect: arrayOfTagIds,
        },
      },
    });
  } catch (error) {
    console.error({ error });
    throw new Error('Error creating List', { cause: error });
  }
};

export default createListHandler;
