"use client";

export function useBookStats(books) {
  const stats = {
    total: books.length,
    owned: books.filter((book) => book.status === "owned").length,
    reading: books.filter((book) => book.status === "reading").length,
    toRead: books.filter((book) => book.status === "toRead").length,
  };

  return stats;
}
