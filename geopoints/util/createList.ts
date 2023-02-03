export const createList = async (listData: unknown, authorId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/lists/create`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listData, authorId }),
    }
  );
  if (!res.ok) throw new Error("Error creating a new list");
  const newList = await res.json();
  console.log("A new list has been created correctly", { newList });
  return newList;
};
