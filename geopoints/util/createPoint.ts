export const createPoint = async (pointData: unknown, listId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/points/create`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pointData, listId }),
    }
  );
  if (!res.ok) throw new Error('Error creating a new point');
  const newPoint = await res.json();
  console.log('A new point has been cretaed correctly', { newPoint });
  return newPoint;
};

