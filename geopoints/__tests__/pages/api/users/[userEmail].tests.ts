import {
  createRequest,
  createResponse,
  createMocks,
  RequestMethod,
} from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import getUserData from '../../../../pages/api/users/[userEmail]';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

describe('api/users/[userEmail] API Endpoint', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res }: { req: ApiRequest; res: ApiResponse } = createMocks({
      method,
    });
    req.headers = {
      'Content-Type': 'application/json',
    };
    req.query = { userEmail: process.env.NEXT_PUBLIC_YOUR_EMAIL };
    return { req, res };
  }

  it('Should retrieve the correct data when user is already in the database', async () => {
    const { req, res } = mockRequestResponse();
    await getUserData(req, res);
    const { userData, error } = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
    expect(error).toBe(false);
    expect(userData).toBeTruthy();
    expect(userData).toHaveProperty('id');
    expect(userData).toHaveProperty('userName');
    expect(userData).toHaveProperty('name');
    expect(userData).toHaveProperty('bio');
    expect(userData).toHaveProperty('imagePath');
    expect(userData).toHaveProperty('instagram');
    expect(userData).toHaveProperty('facebook');
    expect(userData).toHaveProperty('password');
    expect(userData).toHaveProperty('ownLists');
    expect(userData).toHaveProperty('likedLists');
    expect(userData).toHaveProperty('likedPoints');
  });

  it('Should return an error on response body when email is not in database, but status code should still be 200', async () => {
    const { req, res } = mockRequestResponse();
    req.query = { userEmail: 'notexiststent@gmail.com' };
    await getUserData(req, res);
    const { userData, error } = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
    expect(res.statusMessage).toEqual('OK');
    expect(error).toBeTruthy();
    expect(error).toBe('User not found');
    expect(userData).toBe(null);
    expect(userData).toBeFalsy();
  });

  describe('userEmail type', () => {
    it('Should return error message when userEmail is null', async () => {
      const { req, res } = mockRequestResponse();
      req.query = { userEmail: null };
      await getUserData(req, res);
      const { userData, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe('Incorrect email value');
      expect(userData).toBe(null);
      expect(userData).toBeFalsy();
    });

    it('Should return error message when userEmail is undefined', async () => {
      const { req, res } = mockRequestResponse();
      req.query = { userEmail: undefined };
      await getUserData(req, res);
      const { userData, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe('Incorrect email value');
      expect(userData).toBe(null);
      expect(userData).toBeFalsy();
    });

    it('Should return error message when userEmail is a number', async () => {
      const { req, res } = mockRequestResponse();
      req.query = { userEmail: 234 };
      await getUserData(req, res);
      const { userData, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe('Incorrect email value');
      expect(userData).toBe(null);
      expect(userData).toBeFalsy();
    });

    it('Should return error message when userEmail is an object', async () => {
      const { req, res } = mockRequestResponse();
      req.query = { userEmail: {} };
      await getUserData(req, res);
      const { userData, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe('Incorrect email value');
      expect(userData).toBe(null);
      expect(userData).toBeFalsy();
    });

    it('Should return error message when userEmail is an array', async () => {
      const { req, res } = mockRequestResponse();
      req.query = { userEmail: [] };
      await getUserData(req, res);
      const { userData, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe('Incorrect email value');
      expect(userData).toBe(null);
      expect(userData).toBeFalsy();
    });

    it('Should return error message when userEmail is a symbol', async () => {
      const { req, res } = mockRequestResponse();
      req.query = { userEmail: Symbol('hello') };
      await getUserData(req, res);
      const { userData, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe('Incorrect email value');
      expect(userData).toBe(null);
      expect(userData).toBeFalsy();
    });

    it('Should return error message when userEmail is an boolean', async () => {
      const { req, res } = mockRequestResponse();
      req.query = { userEmail: true };
      await getUserData(req, res);
      const { userData, error } = res._getJSONData();

      expect(res.statusCode).toBe(500);
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json' });
      expect(error).toBeTruthy();
      expect(error).toBe('Incorrect email value');
      expect(userData).toBe(null);
      expect(userData).toBeFalsy();
    });
  });
});

export {};
