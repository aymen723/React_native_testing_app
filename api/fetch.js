import axiosInstance from "./axios";

export async function bookslist() {
  const res = await axiosInstance.get("/public/books");

  if (!res.status) {
    throw new Error("Failed to fetch movies");
  }

  return res;
}
