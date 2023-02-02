import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Point, UpdateUserBackEndParams } from '../../../types/types';

const prisma = new PrismaClient();

const createPointHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { pointData, listId } = req.body;
    console.log(pointData, listId);
    checkIfPointDataIsValid(pointData);
    if (!listId) throw new Error('You have to send pointData and listId');
    const newPoint = await createPoint(pointData, Number(listId));
    res.status(200).json({ newPoint });
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
    Object.hasOwn(pointData, 'isPublic') &&
    Object.hasOwn(pointData, 'lng') &&
    Object.hasOwn(pointData, 'lat')
  ) {
    return true;
  }
  throw new Error('Error: you must send a valid point object');
};

const createPoint = async (pointData: Point, listId: number) => {
  try {
    const { title, isPublic, lng, lat, description } = pointData;
    return await prisma.point.create({
      data: { title, isPublic, lng, lat, listId, description },
    });
  } catch (error) {
    console.error({ error });
    throw new Error('Error creating point', { cause: error });
  }
};

export default createPointHandler;
