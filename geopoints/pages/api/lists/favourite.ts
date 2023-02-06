import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// const addListToFavourites = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { userId, listId } = req.body

//     const user = await prisma.user.findUnique({
//       where: { id: userId }
//     })

//     if (!user) {
//       throw new Error('User not found')
//     }

//     const list = await prisma.list.findUnique({
//       where: { id: listId }
//     })

//     if (!list) {
//       throw new Error('List not found')
//     }

//     const updateFavs = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         likedLists: {
//           connect: { id: listId }
//         }
//       }
//     })

//     res.status(200).json({
//       message: 'List added to favourites',
//       user: updateFavs
//     })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, listId } = req.body
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        likedLists: {
          connect: {
            id: listId
          }
        }
      }
    })
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
