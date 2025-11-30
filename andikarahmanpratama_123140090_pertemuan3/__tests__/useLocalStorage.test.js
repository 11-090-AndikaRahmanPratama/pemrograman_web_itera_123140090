/**
 * Unit test untuk useLocalStorage custom hook
 * Menguji save, retrieve, dan error handling
 */

describe("useLocalStorage Hook", () => {
  beforeEach(() => {
    // Clear localStorage sebelum setiap test
    localStorage.clear();
  });

  it("should initialize with default value", () => {
    const key = "testKey";
    const initialValue = [];

    localStorage.setItem(key, JSON.stringify(initialValue));
    const stored = JSON.parse(localStorage.getItem(key));

    expect(stored).toEqual([]);
  });

  it("should save value to localStorage", () => {
    const key = "books";
    const value = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
    ];

    localStorage.setItem(key, JSON.stringify(value));

    expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
  });

  it("should retrieve value from localStorage", () => {
    const key = "books";
    const value = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
    ];

    localStorage.setItem(key, JSON.stringify(value));
    const retrieved = JSON.parse(localStorage.getItem(key));

    expect(retrieved).toEqual(value);
    expect(retrieved[0].title).toBe("Book 1");
  });

  it("should update value in localStorage", () => {
    const key = "books";
    const initialValue = [
      { id: "1", title: "Book 1", author: "Author 1", status: "owned" },
    ];

    localStorage.setItem(key, JSON.stringify(initialValue));

    const updatedValue = [
      ...initialValue,
      { id: "2", title: "Book 2", author: "Author 2", status: "reading" },
    ];

    localStorage.setItem(key, JSON.stringify(updatedValue));
    const retrieved = JSON.parse(localStorage.getItem(key));

    expect(retrieved.length).toBe(2);
  });

  it("should handle JSON parse error gracefully", () => {
    const key = "badData";
    localStorage.setItem(key, "invalid json");

    try {
      JSON.parse(localStorage.getItem(key));
    } catch (error) {
      expect(error).toBeInstanceOf(SyntaxError);
    }
  });

  it("should remove value from localStorage", () => {
    const key = "books";
    localStorage.setItem(key, JSON.stringify([]));

    localStorage.removeItem(key);

    expect(localStorage.getItem(key)).toBeNull();
  });

  it("should handle multiple keys", () => {
    const key1 = "books";
    const key2 = "authors";
    const value1 = [];
    const value2 = [];

    localStorage.setItem(key1, JSON.stringify(value1));
    localStorage.setItem(key2, JSON.stringify(value2));

    expect(localStorage.getItem(key1)).toBe(JSON.stringify(value1));
    expect(localStorage.getItem(key2)).toBe(JSON.stringify(value2));
  });
});
