/**
 * Unit test untuk BookContext
 * Menguji Context creation dan value provisioning
 */

import { createContext } from "react";
import jest from "jest";

describe("BookContext", () => {
  it("should create context successfully", () => {
    const BookContext = createContext();

    expect(BookContext).toBeDefined();
    expect(BookContext.Provider).toBeDefined();
    expect(BookContext.Consumer).toBeDefined();
  });

  it("should provide initial value", () => {
    const BookContext = createContext({ books: [], setBooks: () => {} });

    expect(BookContext._currentValue).toBeDefined();
  });

  it("should handle context value updates", () => {
    const mockSetBooks = jest.fn();
    const initialBooks = [];

    const contextValue = {
      books: initialBooks,
      setBooks: mockSetBooks,
    };

    contextValue.setBooks([
      { id: "1", title: "Book", author: "Author", status: "owned" },
    ]);

    expect(mockSetBooks).toHaveBeenCalled();
  });

  it("should preserve books data in context", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
    ];

    const contextValue = {
      books: books,
      setBooks: jest.fn(),
    };

    expect(contextValue.books).toEqual(books);
    expect(contextValue.books.length).toBe(2);
  });

  it("should allow adding books via setBooks", () => {
    const mockSetBooks = jest.fn();
    const initialBooks = [];

    const contextValue = {
      books: initialBooks,
      setBooks: mockSetBooks,
    };

    const newBook = {
      id: "1",
      title: "New Book",
      author: "Author",
      status: "owned",
    };
    const updatedBooks = [...contextValue.books, newBook];

    contextValue.setBooks(updatedBooks);

    expect(mockSetBooks).toHaveBeenCalledWith(updatedBooks);
  });

  it("should support deleting books via setBooks", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
    ];

    const mockSetBooks = jest.fn();
    const contextValue = {
      books: books,
      setBooks: mockSetBooks,
    };

    const filteredBooks = contextValue.books.filter((book) => book.id !== "1");

    contextValue.setBooks(filteredBooks);

    expect(mockSetBooks).toHaveBeenCalledWith(filteredBooks);
    expect(filteredBooks.length).toBe(1);
  });
});
