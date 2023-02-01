import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Point } from '../../../types/types';

const prisma = new PrismaClient();

const createPoint = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // listName is the the list in wich the point is going to be saved. A point can't be created
    // without being a memeber of a list.
    const { pointData, listName } = req.body;
    checkIfPointDataIsValid(pointData);
    if (!listName) throw new Error('You have to send pointData and listName');

    // unfinshed
    // check https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries
    res.status(200);
  } catch (error) {
    if (error instanceof Error) {
      console.error({ error });
      res.status(400).send({ error: error.message });
    }
  }
};

const checkIfPointDataIsValid = (pointData: Point) => {
  if (!pointData) {
    throw new Error(
      'You have to send a pointData property on the body of the request'
    );
  }
  if (
    Object.hasOwn(pointData, 'title') &&
    Object.hasOwn(pointData, 'public') &&
    Object.hasOwn(pointData, 'lng') &&
    Object.hasOwn(pointData, 'lat') &&
    Object.hasOwn(pointData, 'listId')
  ) {
    return true;
  }
  throw new Error('Error: you must send a valid point object');
};

export default createPoint;
