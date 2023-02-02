import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// userless for now.
const createTagsIfTheyDontExist = async (tagNames: string[]) => {
  const arrayOfListIds: number[] = [];
  for (const tagName of tagNames) {
    try {
      const newList = await prisma.tag.create({ data: { name: tagName } });
      arrayOfListIds.push(newList.id);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new tag cannot be created with this name'
          );
        }
      }
      throw new Error('Something went wrong crating/checking for tags', {
        cause: e,
      });
    }
  }
};

export default createTagsIfTheyDontExist;
