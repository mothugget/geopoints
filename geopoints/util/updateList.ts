export const updateList = async (listData: unknown) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/lists/update`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ list: listData }),
        }
    );
    if (!res.ok) throw new Error("Error creating a new list");
    const newList = await res.json();
    console.log("A new list has been created correctly", { newList });
    return newList;
};
