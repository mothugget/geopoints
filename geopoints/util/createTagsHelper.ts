import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createTagsIfTheyDontExist = async (tagNames: string[]) => {
  const arrayOfTagIds: { id: number }[] = [];
  try {
    for (const tagName of tagNames) {
      const newTag = await prisma.tag.upsert({
        where: { name: tagName },
        update: { name: tagName },
        create: { name: tagName },
      });
      arrayOfTagIds.push({ id: newTag.id });
    }
    return arrayOfTagIds;
  } catch (e) {
    throw new Error('Something went wrong creating/checking for tags', {
      cause: e,
    });
  }
};

export default createTagsIfTheyDontExist;
