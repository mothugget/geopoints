import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import {
  createRequest,
  createResponse,
  createMocks,
  RequestMethod,
} from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import createNewUser from '../../../../pages/api/users/create';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

beforeEach(async () => {
  await clearDatabase();
});

describe('api/users/create API Endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: ApiRequest; res: ApiResponse } = createMocks({
      method,
    });
    req.headers = {
      'Content-Type': 'application/json',
    };
    return { req, res };
  }

  it('Should create a new user when given proper information', async () => {
    const { req, res } = mockRequestResponse();

    req.body = {
      userName: 'userName',
      name: 'name',
      email: 'randomEmail',
      imagePath: 'imagePath',
    };

    await createNewUser(req, res);
    const { newUser, error } = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
    expect(error).toBe(null);
    expect(newUser).toBeTruthy();
    expect(newUser).toHaveProperty('id');
    expect(newUser).toHaveProperty('email');
    expect(newUser).toHaveProperty('userName');
    expect(newUser).toHaveProperty('bio');
    expect(newUser).toHaveProperty('imagePath');
    expect(newUser).toHaveProperty('instagram');
    expect(newUser).toHaveProperty('facebook');
    expect(newUser).toHaveProperty('password');
    expect(newUser).toHaveProperty('ownLists');
  });

  describe('Request body required fields', () => {
    it('Should return an error when request body does not have all required properties', async () => {
      const { req, res } = mockRequestResponse();

      req.body = {
        email: 'randomEmail',
        imagePath: 'imagePath',
      };

      await createNewUser(req, res);
      const { newUser, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe(
        'The request object does not have the required properties'
      );
      expect(newUser).toBe(null);
    });

    it('Should return an error when request body properties are not strings', async () => {
      const { req, res } = mockRequestResponse();

      req.body = {
        userName: 'userName',
        imagePath: 234,
        email: 23455,
        name: false,
      };

      await createNewUser(req, res);
      const { newUser, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe(
        'The requiered properties on request body must be strings'
      );
      expect(newUser).toBe(null);
    });

    it('Should return an error when request body properties are falsy', async () => {
      const { req, res } = mockRequestResponse();

      req.body = {
        userName: '',
        imagePath: 'imagepPth',
        email: 'null',
        name: 'null',
      };

      await createNewUser(req, res);
      const { newUser, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe('The requiered properties must not be empty');
      expect(newUser).toBe(null);
    });
  });
});

async function clearDatabase() {
  const prisma = new PrismaClient();
  try {
    await prisma.user.deleteMany();
    await prisma.list.deleteMany();
    await prisma.point.deleteMany();
    await prisma.tag.deleteMany();

    // create one record with tour email
    await prisma.user.create({
      data: {
        email: process.env.NEXT_PUBLIC_YOUR_EMAIL!,
        userName: faker.internet.userName(),
        name: faker.name.fullName(),
        bio: faker.lorem.sentence(),
        imagePath: faker.image.avatar(),
        ownLists: {
          create: [
            {
              title: 'My Points',
              imagePath: faker.image.nature(),
              points: {
                create: {
                  title: faker.company.bsNoun(),
                  lng: Number(faker.address.longitude()),
                  lat: Number(faker.address.latitude()),
                  imagePath: faker.image.nature(),
                },
              },
            },
            {
              isPublic: true,
              title: faker.company.catchPhrase(),
              description: faker.lorem.sentence(),
              imagePath: faker.image.fashion(),
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
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

export {};
