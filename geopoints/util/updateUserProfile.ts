export const updateUserProfile = async (updatedInfo: unknown, userId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/update`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updatedInfo, userId }),
    }
  );
  if (!res.ok) throw new Error("Error updating profile info");
  const updated = await res.json();
  console.log("The profile has been updated", { updated });
  return updated;
};
