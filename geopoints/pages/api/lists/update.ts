import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { List } from '../../../types/types';
import createTagsIfTheyDontExist from '../../../util/createTagsHelper';

const prisma = new PrismaClient();


// const updateList = async (
//   listData: List,
// ) => {
//   try {
//     const { title, isPublic, description, imagePath } = listData;
//     return await prisma.list.create({
//       data: {
//         title,
//         isPublic,
//         authorId,
//         description,
//         imagePath,
//         tags: {
//           connect: arrayOfTagIds,
//         },
//       },
//       include: {
//         tags: true,
//       },
//     });
//   } catch (error) {
//     console.error({ error });
//     throw new Error('Error creating List', { cause: error });
//   }
// };

// export default updateList;
