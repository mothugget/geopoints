import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import {
  createRequest,
  createResponse,
  createMocks,
  RequestMethod,
} from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import deletePointHandler from '../../../../pages/api/points/delete';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;
const prisma = new PrismaClient();

beforeEach(async () => {
  await clearDatabase();
});

describe('api/point/delete API Endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'DELETE') {
    const { req, res }: { req: ApiRequest; res: ApiResponse } = createMocks({
      method,
    });
    req.headers = {
      'Content-Type': 'application/json',
    };
    return { req, res };
  }

  it('Should delete a point', async () => {
    const { req, res } = mockRequestResponse();
    const userInDb = await createNewUser();
    const pointId = userInDb?.ownLists?.at(0)?.points?.at(0)?.id;

    expect(pointId).toBeTruthy();

    req.body = {
      pointId,
    };

    await deletePointHandler(req, res);
    const { deletedPoint, error } = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
    expect(error).toBe(null);
    expect(deletedPoint).toBeTruthy();
    expect(deletedPoint.id).toBe(pointId);

    const isPointStillInTheDb = await getPointById(pointId!);
    expect(isPointStillInTheDb).toBeFalsy();
    expect(isPointStillInTheDb).toBe(null);
  });

  it('Should return error if no pointId in request body', async () => {
    const { req, res } = mockRequestResponse();
    const userInDb = await createNewUser();
    const pointId = userInDb?.ownLists?.at(0)?.points?.at(0)?.id;

    expect(pointId).toBeTruthy();

    req.body = {
      pointId: undefined,
    };

    await deletePointHandler(req, res);
    const { deletedPoint, error } = res._getJSONData();

    expect(res.statusCode).toBe(400);
    expect(error).toBeTruthy();
    expect(error).toBe(
      'You have to send a pointId property on the body of the request'
    );
    expect(deletedPoint).toBe(null);

    const isPointStillInTheDb = await getPointById(pointId!);
    expect(isPointStillInTheDb).toBeTruthy();
    expect(isPointStillInTheDb?.id).toBe(pointId);
  });

  it('Should return error if pointId is not a number', async () => {
    const { req, res } = mockRequestResponse();
    const userInDb = await createNewUser();
    const pointId = userInDb?.ownLists?.at(0)?.points?.at(0)?.id;

    expect(pointId).toBeTruthy();

    req.body = {
      pointId: 'string',
    };

    await deletePointHandler(req, res);
    const { deletedPoint, error } = res._getJSONData();

    expect(res.statusCode).toBe(400);
    expect(error).toBeTruthy();
    expect(error).toBe('The pointId must be a number');
    expect(deletedPoint).toBe(null);

    const isPointStillInTheDb = await getPointById(pointId!);
    expect(isPointStillInTheDb).toBeTruthy();
    expect(isPointStillInTheDb?.id).toBe(pointId);
  });
});

async function clearDatabase() {
  const prisma = new PrismaClient();
  try {
    await prisma.user.deleteMany();
    await prisma.list.deleteMany();
    await prisma.point.deleteMany();
    await prisma.tag.deleteMany();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function createNewUser() {
  return await prisma.user.create({
    data: {
      email: faker.internet.email(),
      userName: faker.internet.userName(),
      name: faker.name.fullName(),
      bio: faker.lorem.sentence(),
      imagePath: faker.image.avatar(),
      ownLists: {
        create: [
          {
            title: 'Best reading spots',
            description: faker.lorem.sentence(),
            imagePath: faker.image.nature(),
            isPublic: true,
            tags: {
              create: {
                name: faker.random.word(),
              },
            },
            points: {
              create: {
                title: faker.company.bsNoun(),
                lng: Number(faker.address.longitude()),
                lat: Number(faker.address.latitude()),
                imagePath: faker.image.business(),
              },
            },
          },
        ],
      },
    },
    include: {
      ownLists: {
        include: {
          points: true,
        },
      },
    },
  });
}

async function getPointById(id: number) {
  return await prisma.point.findUnique({
    where: {
      id,
    },
  });
}
export {};
