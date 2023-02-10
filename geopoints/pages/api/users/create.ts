import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createNewUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (bodyHasTheProperData(req)) {
      const { userName, name, email, imagePath } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          userName,
          email,
          imagePath,
          ownLists: {
            create: { title: 'My Points' },
          },
        },
        include: {
          ownLists: true,
          likedLists: true
        },
      });
      res.status(200).json({ newUser, error: null });
    } else {
      throw new Error('Incorrect data on request body');
    }
  } catch (error) {
    console.error({ error });
    if (error instanceof Error) {
      res.status(500).json({ newUser: null, error: error.message });
    } else {
      res.status(500).json({ newUser: null, error: 'Something went wrong' });
    }
  }
};

function bodyHasTheProperData(req: NextApiRequest) {
  if (
    !Object.hasOwn(req.body, 'userName') ||
    !Object.hasOwn(req.body, 'name') ||
    !Object.hasOwn(req.body, 'email') ||
    !Object.hasOwn(req.body, 'imagePath')
  ) {
    throw new Error('The request object does not have the required properties');
  }
  const { userName, name, email, imagePath } = req.body;

  if (
    typeof userName !== 'string' ||
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof imagePath !== 'string'
  ) {
    throw new Error('The requiered properties on request body must be strings');
  }

  if (
    userName.length === 0 ||
    name.length === 0 ||
    email.length === 0 ||
    imagePath.length === 0
  ) {
    throw new Error('The requiered properties must not be empty');
  }
  return true;
}
export default createNewUser;
