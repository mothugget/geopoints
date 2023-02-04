import { createMocks, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import getUserData from '../../../../pages/api/users/[userEmail]';

describe('api/users/[userEmail] API Endpoint', () => {
  it('Should return a successful response when user is already in the database', async () => {
    function mockRequestResponse(method: RequestMethod = 'GET') {
      const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
        createMocks({ method });
      req.headers = {
        'Content-Type': 'application/json',
      };
      req.query = { userEmail: process.env.NEXT_PUBLIC_YOUR_EMAIL };
      return { req, res };
    }

    const { req, res } = mockRequestResponse();
    await getUserData(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
  });

  // it("Should return a error if the user doesn't exist", async () => {
  //   function mockRequestResponse(method: RequestMethod = 'GET') {
  //     const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
  //       createMocks({ method });
  //     req.headers = {
  //       'Content-Type': 'application/json',
  //     };
  //     req.query = { userEmail: 'notuser@gmail.com' };
  //     return { req, res };
  //   }

  //   const { req, res } = mockRequestResponse();
  //   await getUserData(req, res);
  //   console.log({res})

  //   expect(res.statusCode).toBe(500);
  //   expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
  //   expect(res.statusMessage).toEqual('OK');
  // });
});

export {};
