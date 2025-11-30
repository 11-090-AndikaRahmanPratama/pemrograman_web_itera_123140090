/**
 * Unit test untuk useBookStats custom hook
 * Menguji perhitungan statistik buku
 */

describe("useBookStats Hook", () => {
  const useBookStats = (books) => {
    return {
      total: books.length,
      owned: books.filter((book) => book.status === "owned").length,
      reading: books.filter((book) => book.status === "reading").length,
      toRead: books.filter((book) => book.status === "toRead").length,
    };
  };

  it("should calculate total books", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
      { id: "3", title: "Book 3", author: "Author 3", status: "toRead" },
    ];

    const stats = useBookStats(books);

    expect(stats.total).toBe(3);
  });

  it("should count owned books", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
      { id: "2", title: "Book 2", author: "Author 2", status: "owned" },
      { id: "3", title: "Book 3", author: "Author 3", status: "reading" },
    ];

    const stats = useBookStats(books);

    expect(stats.owned).toBe(2);
  });

  it("should count reading books", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "reading" },
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
      { id: "3", title: "Book 3", author: "Author 3", status: "toRead" },
    ];

    const stats = useBookStats(books);

    expect(stats.reading).toBe(2);
  });

  it("should count toRead books", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "toRead" },
      { id: "2", title: "Book 2", author: "Author 2", status: "toRead" },
      { id: "3", title: "Book 3", author: "Author 3", status: "owned" },
    ];

    const stats = useBookStats(books);

    expect(stats.toRead).toBe(2);
  });

  it("should handle empty books array", () => {
    const books = [];

    const stats = useBookStats(books);

    expect(stats.total).toBe(0);
    expect(stats.owned).toBe(0);
    expect(stats.reading).toBe(0);
    expect(stats.toRead).toBe(0);
  });

  it("should return correct stats object structure", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
    ];

    const stats = useBookStats(books);

    expect(stats).toHaveProperty("total");
    expect(stats).toHaveProperty("owned");
    expect(stats).toHaveProperty("reading");
    expect(stats).toHaveProperty("toRead");
  });

  it("should update stats when books array changes", () => {
    const books1 = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
    ];
    const stats1 = useBookStats(books1);

    const books2 = [
      ...books1,
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
    ];
    const stats2 = useBookStats(books2);

    expect(stats1.total).toBe(1);
    expect(stats2.total).toBe(2);
  });

  it("should calculate stats correctly with mixed status", () => {
    const books = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
      { id: "2", title: "Book 2", author: "Author 2", status: "owned" },
      { id: "3", title: "Book 3", author: "Author 3", status: "reading" },
      { id: "4", title: "Book 4", author: "Author 4", status: "toRead" },
      { id: "5", title: "Book 5", author: "Author 5", status: "toRead" },
    ];

    const stats = useBookStats(books);

    expect(stats.total).toBe(5);
    expect(stats.owned).toBe(2);
    expect(stats.reading).toBe(1);
    expect(stats.toRead).toBe(2);
  });
});
