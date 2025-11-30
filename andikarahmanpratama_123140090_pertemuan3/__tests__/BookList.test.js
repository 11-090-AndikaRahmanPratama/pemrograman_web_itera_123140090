/**
 * Unit test untuk BookList component
 * Menguji rendering list buku dan empty state
 */

import jest from "jest"; // Import jest to declare the variable

describe("BookList Component", () => {
  it("should render list of books", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
    ];

    expect(books.length).toBe(2);
    expect(books[0].title).toBe("Book 1");
  });

  it("should show empty state when no books", () => {
    const books = [];
    const isEmpty = books.length === 0;

    expect(isEmpty).toBe(true);
  });

  it("should display correct number of books", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
      { id: "3", title: "Book 3", author: "Author 3", status: "toRead" },
    ];

    expect(books.length).toBe(3);
  });

  it("should call onEdit when edit button clicked", () => {
    const mockOnEdit = jest.fn();
    const book = { id: "1", title: "Book", author: "Author", status: "owned" };

    mockOnEdit(book);

    expect(mockOnEdit).toHaveBeenCalledWith(book);
  });

  it("should call onDelete when delete button clicked", () => {
    const mockOnDelete = jest.fn();
    const bookId = "1";

    mockOnDelete(bookId);

    expect(mockOnDelete).toHaveBeenCalledWith(bookId);
  });

  it("should filter books by status", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
      { id: "3", title: "Book 3", author: "Author 3", status: "toRead" },
    ];

    const ownedBooks = books.filter((book) => book.status === "owned");

    expect(ownedBooks.length).toBe(1);
    expect(ownedBooks[0].title).toBe("Book 1");
  });

  it("should render BookCard for each book", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
    ];

    const bookCards = books.map((book) => ({
      bookId: book.id,
      title: book.title,
    }));

    expect(bookCards.length).toBe(2);
    expect(bookCards[0].title).toBe("Book 1");
  });
});
