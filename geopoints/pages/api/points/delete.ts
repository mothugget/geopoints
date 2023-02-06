import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Point } from '../../../types/types';

const prisma = new PrismaClient();

const deletePointHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { pointId } = req.body;
    checkIfPointIdIsValid(pointId);
    const deletedPoint = await prisma.point.delete({
      where: {
        id: Number(pointId),
      },
    });
    res.status(200).json({ deletedPoint, error: null });
  } catch (error) {
    console.error({ error });
    if (error instanceof Error) {
      res.status(400).json({ deletedPoint: null, error: error.message });
    } else {
      res
        .status(400)
        .json({ deletedPoint: null, error: 'Something went wrong' });
    }
  }
};

const checkIfPointIdIsValid = (pointId: number) => {
  const { isNaN } = Number;
  if (!pointId) {
    throw new Error(
      'You have to send a pointId property on the body of the request'
    );
  }
  if (isNaN(Number(pointId))) {
    // if it's not a number
    throw new Error('The pointId must be a number');
  }
};

const createPoint = async (pointData: Point, listId: number) => {
  try {
    const { title, isPublic, lng, lat, description, imagePath } = pointData;
    return await prisma.point.create({
      data: { title, isPublic, lng, lat, listId, description, imagePath },
    });
  } catch (error) {
    console.error({ error });
    throw new Error('Error creating point', { cause: error });
  }
};

export default deletePointHandler;
