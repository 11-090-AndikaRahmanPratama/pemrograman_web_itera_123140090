"use client";

import BookCard from "./BookCard";

export default function BookList({ books, onDelete, onEdit }) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Tidak ada buku yang sesuai dengan kriteria pencarian
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
