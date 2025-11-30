"use client";

import { useState } from "react";
import Link from "next/link";
import { BookContext } from "@/context/BookContext";
import BookList from "@/components/BookList";
import BookForm from "@/components/BookForm";
import BookFilter from "@/components/BookFilter";
import SearchBar from "@/components/SearchBar";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [books, setBooks] = useLocalStorage("books", []);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [errors, setErrors] = useState({});

  const filteredBooks = books.filter((book) => {
    const matchesStatus =
      selectedStatus === "all" || book.status === selectedStatus;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const validateForm = (book) => {
    const newErrors = {};
    if (!book.title.trim()) newErrors.title = "Judul buku harus diisi";
    if (!book.author.trim()) newErrors.author = "Penulis harus diisi";
    if (!book.status) newErrors.status = "Status harus dipilih";
    return newErrors;
  };

  const handleAddBook = (newBook) => {
    const validationErrors = validateForm(newBook);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingBook) {
      const updatedBooks = books.map((book) =>
        book.id === editingBook.id ? { ...newBook, id: editingBook.id } : book
      );
      setBooks(updatedBooks);
      setEditingBook(null);
    } else {
      const bookWithId = {
        ...newBook,
        id: Date.now().toString(),
      };
      setBooks([...books, bookWithId]);
    }

    setIsAddingBook(false);
    setErrors({});
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsAddingBook(true);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setIsAddingBook(false);
    setErrors({});
  };

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Manajemen Buku
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Kelola koleksi bukuku
                </p>
              </div>
              <Link
                href="/stats"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Statistik
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar query={searchQuery} onChange={setSearchQuery} />
            </div>
            <button
              onClick={() => {
                setEditingBook(null);
                setIsAddingBook(!isAddingBook);
                setErrors({});
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
            >
              {isAddingBook ? "Batal" : "Tambah Buku"}
            </button>
          </div>

          {isAddingBook && (
            <div className="mb-8 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                {editingBook ? "Edit Buku" : "Tambah Buku Baru"}
              </h2>
              <BookForm
                onAdd={handleAddBook}
                onCancel={handleCancelEdit}
                initialData={editingBook}
                errors={errors}
              />
            </div>
          )}

          <div className="mb-6">
            <BookFilter
              selectedStatus={selectedStatus}
              onChange={setSelectedStatus}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Total Buku: {filteredBooks.length}
              </h2>
            </div>
            <BookList
              books={filteredBooks}
              onDelete={handleDeleteBook}
              onEdit={handleEditBook}
            />
          </div>
        </div>
      </main>
    </BookContext.Provider>
  );
}
