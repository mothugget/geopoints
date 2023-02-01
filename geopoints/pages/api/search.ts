import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { q } = req.query;
    if (q && typeof q === 'string') {
      const results = await prisma.list.findMany({
        where: {
          title: {
            search: `${q.toLowerCase()} | ${q} | ${q.toUpperCase()}`,
          },
          public: true,
        },
        include: {
          author: true,
        },
      });
      console.log({ results });
      res.status(200).json(results);
    } else {
      // no results
      res.status(400).json({});
    }
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error });
  }
};

export default handler;
