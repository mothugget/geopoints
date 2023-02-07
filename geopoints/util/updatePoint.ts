export const updatePoint = async (pointData: unknown) => {
  console.log('this is what we are sending: ', { pointData });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/points/update`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ point: pointData }),
    }
  );
  if (!res.ok) throw new Error('Error updating a point');
  const data = await res.json();
  console.log('Edited point', { data });
  return data.updatedPoint;
};
