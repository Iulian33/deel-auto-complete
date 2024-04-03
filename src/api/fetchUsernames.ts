interface User {
  username: string;
}

export const fetchUsernames = async (): Promise<string[]> => {
  try {
    const response: Response = await fetch(
      "https://jsonplaceholder.typicode.com/users",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.map((user: User) => user.username);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};
